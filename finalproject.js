import {defs, tiny} from './examples/common.js';
import {Shape_From_File} from "./examples/obj-file-demo.js";

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

const {Textured_Phong} = defs


class Cube extends Shape {
    constructor() {
        super("position", "normal",);
        // Loop 3 times (for each axis), and inside loop twice (for opposing cube sides):
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1, -1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, -1], [-1, 1, -1], [1, 1, 1], [-1, 1, 1],
            [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1], [1, -1, 1], [1, -1, -1], [1, 1, 1], [1, 1, -1],
            [-1, -1, 1], [1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, -1], [-1, -1, -1], [1, 1, -1], [-1, 1, -1]);
        this.arrays.normal = Vector3.cast(
            [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, -1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0], [0, 1, 0],
            [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [-1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0], [1, 0, 0],
            [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, -1], [0, 0, -1], [0, 0, -1], [0, 0, -1]);
        // Arrange the vertices into a square shape in texture space too:
        this.indices.push(0, 1, 2, 1, 3, 2, 4, 5, 6, 5, 7, 6, 8, 9, 10, 9, 11, 10, 12, 13,
            14, 13, 15, 14, 16, 17, 18, 17, 19, 18, 20, 21, 22, 21, 23, 22);
    }
}

// const guy = defs.guy =
//         class guy extends Shape {constructor() {
//             super("position", "normal");

//             const head = Mat4.scale(1, 1,1);
//             const body = Mat4.scale(1.5, 2, 1);
//             const legs = Mat4.scale(0.5, 1.5, 0.5);

//             // let small_box_transform_1 = Mat4.translation(0, -2, 0).times(Mat4.scale(0.5, 0.5, 0.5));
//             // let small_box_transform_2 = Mat4.translation(2, -2, 0).times(Mat4.scale(0.5, 0.5, 0.5));
//             // this.shapes.cube.draw(context, program_state, box_transform.times(guy_transform), this.materials.plastic);
//             // this.shapes.cube.draw(context, program_state, small_box_transform_1.times(box_transform).times(guy_transform), this.materials.plastic.override({color:blue}));
//             // this.shapes.cube.draw(context, program_state, small_box_transform_2.times(box_transform).times(guy_transform), this.materials.plastic.override({color:blue}));

//             defs.Cube.insert_transformed_copy_into(this, [10, 10], head.times(Mat4.translation(0,4,0)));
//             defs.Cube.insert_transformed_copy_into(this, [] , body.times(Mat4.translation(0, 0.25, 0)));
//             defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(-1.5,-2, 0)));
//             defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(1.5,-2, 0)));
//         }
//     }

class Cube_Outline extends Shape {
    constructor() {
        super("position", "color", "texture_coord");
        //  TODO (Requirement 5).
        // When a set of lines is used in graphics, you should think of the list entries as
        // broken down into pairs; each pair of vertices will be drawn as a line segment.
        // Note: since the outline is rendered with Basic_shader, you need to redefine the position and color of each vertex
        this.arrays.position = Vector3.cast(
            [-1, -1, -1], [1,  -1, -1], 
            [-1, -1, -1], [-1,  1, -1], 
            [-1, -1, -1], [-1, -1,  1], 
            [1,   1, -1], [1,   1,  1],
            [1,   1, -1], [1,  -1, -1], 
            [1,   1, -1], [-1,  1, -1], 

            [1,  -1, -1], [1,  -1,  1], 
            [-1,  1, -1], [-1,  1,  1],

            [-1, -1,  1], [1,  -1,  1], 
            [-1, -1,  1], [-1,  1,  1],

            [1,   1,  1], [-1,  1,  1], 
            [1,   1,  1], [1,  -1,  1]);
        for (let i = 0; i < 24; i++) {
            this.arrays.color.push(color(1,1,1,1));
        }
        this.indices = false;
    }
}

class Cube_Single_Strip extends Shape {
    constructor() {
        super("position", "normal");

        // TODO (Requirement 6)
        this.arrays.position = Vector3.cast(
            [-1,-1,-1], [1,-1,-1], [-1,-1,1], [1,-1,1], 
            [-1,1,-1], [1,1,-1], [-1,1,1], [1,1,1]);
            
        this.arrays.normal = Vector3.cast(
            [-1,-1,-1], [1,-1,-1], [-1,-1,1], [1,-1,1], 
            [-1,1,-1], [1,1,-1], [-1,1,1], [1,1,1]);

        this.indices.push(0, 1, 2, 3, 7, 2, 5, 0, 4, 2, 6, 7, 4, 5);
    }
}


class Base_Scene extends Scene {
    /**
     *  **Base_scene** is a Scene that can be added to any display canvas.
     *  Setup the shapes, materials, camera, and lighting here.
     */
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();
        this.hover = this.swarm = false;
        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            'cube': new Cube(),
            'outline': new Cube_Outline(),
            
            'strip': new Cube_Single_Strip(),
            'sphere': new defs.Subdivision_Sphere(3),

            'floor': new Cube(),
            'building': new Cube(),
            'gun': new Shape_From_File("assets/gun.obj"), // gun shape
            'sky': new defs.Subdivision_Sphere(4),
            // 'guy': new guy(),
        };
        
        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            floor: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#0000ff")}),
            building: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ff0000")}),
            sky: new Material(new defs.Phong_Shader(),
                {ambient: .8, diffusivity: .9, color: hex_color("#add8e6")}),
            // building: new Material(new Textured_Phong(),
            //     {ambient: .4, texture: new Texture("assets/BrickWall.jpg", "NEAREST")}),
            gun: new Material(new Textured_Phong(),
                {ambient: color(1,1,1,1), diffuse: [.64, .64, .64], specular: [0, 0, 0], emissive: [0, 0, 0], opticalDensity: 1.0, opacity: 1.0,  illum: 1, texture: new Texture("assets/gun.png")}),
        };
        // The white material and basic shader are used for drawing the outline.
        this.white = new Material(new defs.Basic_Shader());

        this.boxcolors = [];
        this.set_colors();
        this.sitstill = false;
        this.borders = false;
    }

    display(context, program_state) {
        // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            program_state.set_camera(Mat4.translation(5, -10, -30));
        }
        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];
    }
}

export class FinalProject extends Base_Scene {
    /**
     * This Scene object can be added to any display canvas.
     * We isolate that code so it can be experimented with on its own.
     * This gives you a very small code sandbox for editing a simple scene, and for
     * experimenting with matrix transformations.
     */
    constructor()
    {
        super();
        this.animation_queue = [];
        this.initial_camera_location = Mat4.look_at(vec3(0, 3, 25), vec3(0, 3, 0), vec3(0, 4, 0));

    }
    set_colors() {

        // TODO:  Create a class member variable to store your cube's colors.
        // Hint:  You might need to create a member variable at somewhere to store the colors, using `this`.
        // Hint2: You can consider add a constructor for class Assignment2, or add member variables in Base_Scene's constructor.
        for(let i = 0; i < 8; i++)
        {
            this.boxcolors[i] = color(Math.random(),Math.random(), Math.random(), 1.0);
        }
    }

    make_control_panel() {
        // Draw the scene's buttons, setup their actions and keyboard shortcuts, and monitor live measurements.
        this.key_triggered_button("Change Colors", ["c"], this.set_colors);
        // Add a button for controlling the scene.
        this.key_triggered_button("Outline", ["o"], () => {
            // TODO:  Requirement 5b:  Set a flag here that will toggle your outline on and off
            this.borders = !this.borders;
        });
        this.key_triggered_button("Sit still", ["m"], () => {
            // TODO:  Requirement 3d:  Set a flag here that will toggle your swaying motion on and off.
            this.sitstill = !this.sitstill;
        });

        this.key_triggered_button("Turn Left", ["l"], () => {
            // TODO:  Requirement 3d:  Set a flag here that will toggle your swaying motion on and off.
            ;
        });
    }

    // draw_box(context, program_state, model_transform, boxnum, scalenum=1) {
    //     // TODO:  Helper function for requirement 3 (see hint).
    //     //        This should make changes to the model_transform matrix, draw the next box, and return the newest model_transform.
    //     // Hint:  You can add more parameters for this function, like the desired color, index of the box, etc.
    //     const bc = this.boxcolors[boxnum];
    //     const maxAngle = 0.5*Math.PI/8;
    //     const t = this.t = program_state.animation_time / 1000;
    //     var rotAngle = 0;
    //     if (this.sitstill)
    //     {
    //         rotAngle = maxAngle;
    //     }
    //     else
    //     {
    //         if(boxnum == 0)
    //         {
    //             rotAngle = 0;
    //         }
    //         else
    //         {
    //             rotAngle = ((maxAngle/2)+(maxAngle/2)*(Math.sin(Math.PI*(t))));
    //         }
    //     }

    //     // model_transform = model_transform.times(Mat4.translation(-1,scalenum,0)).times(Mat4.rotation(rotAngle,0,0,1)).times(Mat4.translation(1,-scalenum,0)).times(Mat4.translation(0,2*scalenum,0));
    //     // model_transform = model_transform.times(Mat4.scale(1,scalenum,1));
    //     // model_transform = model_transform.times(Mat4.translation(0,num,0));
    //     if(this.borders)
    //     {
    //         // this.shapes.Cube_Outline.draw(context, program_state, model_transform);
    //         this.shapes.outline.draw(context, program_state, model_transform, this.white, "LINES");
    //     }
    //     else
    //     {
    //         if(boxnum % 2 == 0)
    //         {
    //             this.shapes.strip.draw(context, program_state, model_transform.times(Mat4.scale(1,scalenum,1)), this.materials.plastic.override({color:bc}),"TRIANGLE_STRIP");
    //         }
    //         else
    //         {
    //             this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1,scalenum,1)), this.materials.plastic.override({color:bc}));
    //         }
    //     }
    //     // this.shapes.cube.draw(context, program_state, model_transform, this.materials.plastic.override({color:boxColor}));
    //     // model_transform = model_transform.times(Mat4.scale(1, (1/scalenum), 1));
    //     return model_transform;
    // }

    my_mouse_down(e, pos, context, program_state) {
        let pos_ndc_near = vec4(pos[0], pos[1], -1.0, 1.0);
        let pos_ndc_far  = vec4(pos[0], pos[1],  1.0, 1.0);
        let center_ndc_near = vec4(0.0, 0.0, -1.0, 1.0);
        let P = program_state.projection_transform;
        let V = program_state.camera_inverse;
        let pos_world_near = Mat4.inverse(P.times(V)).times(pos_ndc_near);
        let pos_world_far  = Mat4.inverse(P.times(V)).times(pos_ndc_far);
        let center_world_near  = Mat4.inverse(P.times(V)).times(center_ndc_near);
        pos_world_near.scale_by(1 / pos_world_near[3]);
        pos_world_far.scale_by(1 / pos_world_far[3]);
        center_world_near.scale_by(1 / center_world_near[3]);
        // console.log(pos_world_near);
        // console.log(pos_world_far);
        //
        // Do whatever you want
        let animation_bullet = {
            from: center_world_near,
            to: pos_world_far,
            start_time: program_state.animation_time,
            end_time: program_state.animation_time + 5000,
            more_info: "add gravity"
        }

        this.animation_queue.push(animation_bullet)
    }

    display(context, program_state) {

            // display():  Called once per frame of animation. Here, the base class's display only does
        // some initial setup.

        // // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
        // if (!context.scratchpad.controls) {
        //     this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
        //     // Define the global camera and projection matrices, which are stored in program_state.
        //     program_state.set_camera(Mat4.translation(5, -10, -30));
        // }
        

        if (!context.scratchpad.controls) {
            this.children.push(context.scratchpad.controls = new defs.Movement_Controls());
            // Define the global camera and projection matrices, which are stored in program_state.
            let LookAt = Mat4.look_at(vec3(0, 0, 10), vec3(0, 0, 0), vec3(0, 1, 0));
            program_state.set_camera(this.initial_camera_location);

            let canvas = context.canvas;
            const mouse_position = (e, rect = canvas.getBoundingClientRect()) =>
                vec((e.clientX - (rect.left + rect.right) / 2) / ((rect.right - rect.left) / 2),
                    (e.clientY - (rect.bottom + rect.top) / 2) / ((rect.top - rect.bottom) / 2));

            canvas.addEventListener("mousedown", e => {
                e.preventDefault();
                const rect = canvas.getBoundingClientRect()
                console.log("e.clientX: " + e.clientX);
                console.log("e.clientX - rect.left: " + (e.clientX - rect.left));
                console.log("e.clientY: " + e.clientY);
                console.log("e.clientY - rect.top: " + (e.clientY - rect.top));
                console.log("mouse_position(e): " + mouse_position(e));
                this.my_mouse_down(e, mouse_position(e), context, program_state);
            });
        }

        program_state.projection_transform = Mat4.perspective(
            Math.PI / 4, context.width / context.height, 1, 100);

        // *** Lights: *** Values of vector or point lights.
        const light_position = vec4(0, 5, 5, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

        // super.display(context, program_state);
        const blue = hex_color("#1a9ffa");
        let model_transform = Mat4.identity();

        // Example for drawing a cube, you can remove this line if needed
        // this.shapes.cube.draw(context, program_state, model_transform, this.materials.plastic.override({color:blue}));
        // TODO:  Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.

        let guy_translation = Mat4.translation(0,3,0);
        // model_transform = this.draw_box(context, program_state, model_transform.times(Mat4.translation(0,2,0)), 0, 1);
        // this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.translation(0,0,0)).times(Mat4.translation(0,2,0)).times(Mat4.scale(1,1.3,1)), this.materials.plastic.override({color:blue}));
        

        let t = program_state.animation_time;
        if (this.animation_queue.length > 0) {
            for (let i = 0; i < this.animation_queue.length; i++) {
                let animation_bullet = this.animation_queue[i];

                let from = animation_bullet.from;
                let to = animation_bullet.to;
                let start_time = animation_bullet.start_time;
                let end_time = animation_bullet.end_time;

                if (t <= end_time && t >= start_time) {
                    let animation_process = (t - start_time) / (end_time - start_time);
                    let position = to.times(animation_process).plus(from.times(1 - animation_process));

                    if (animation_bullet.more_info === "add gravity") {
                        position[1] -= 0.5 * 9.8/4 * ((t - start_time) / 1000) ** 2;
                    }
                    // position[0] = position[0]*4*t;
                    // position[2] = position[0]*4*t;

                    let model_trans = Mat4.translation(position[0], position[1], position[2])
                        .times(Mat4.rotation(animation_process * 50, .3, .6, .2))
                    this.shapes.sphere.draw(context, program_state, model_trans, this.materials.plastic);
                }
            }
        }
        
        // let position = [0, 0, 0];
        // // position[0] = 
        // // if (animation_bullet.more_info === "add gravity") {
            
        // // }

        // position[1] -= 0.5 * 9.8 * (t / 1000) ** 2;
        // position[0] += t;
        // position[2] += t; 
        
        // let model_trans = Mat4.translation(position[0], position[1], position[2]);
        // this.shapes.sphere.draw(context, program_state, model_trans, this.materials.plastic);

        let LeftLeg = model_transform.times(Mat4.translation(-0.55, -1.4, 0)).times(Mat4.scale(0.4, 0.4, 0.4)).times(Mat4.scale(1,2,1)).times(guy_translation);

        let RightLeg = model_transform.times(Mat4.translation(0.6, -1.4, 0)).times(Mat4.scale(0.4, 0.4, 0.4)).times(Mat4.scale(1,2,1)).times(guy_translation);

        let Head = model_transform.times(Mat4.translation(0, 1.7, 0)).times(Mat4.scale(0.7, 0.7, 0.7)).times(guy_translation);
        let BodyTransform = model_transform.times(Mat4.translation(0, -1, 0)).times(guy_translation);

        this.shapes.cube.draw(context, program_state, BodyTransform, this.materials.plastic.override({color:blue}));

        this.shapes.cube.draw(context, program_state, LeftLeg, this.materials.plastic.override({color:blue}));
        this.shapes.cube.draw(context, program_state, RightLeg, this.materials.plastic.override({color:blue}));
        this.shapes.cube.draw(context, program_state, Head, this.materials.plastic.override({color:blue}));

        

        let floor_transform = model_transform.times(Mat4.scale(150, 0.5, 150)).times(Mat4.translation(0, -2.5, 0));
        this.shapes.floor.draw(context, program_state, floor_transform, this.materials.floor);
        
        let building_transform1 = model_transform.times(Mat4.scale(5,10,10)).times(Mat4.translation(5,0,5));
        this.shapes.building.draw(context, program_state, building_transform1, this.materials.building);

        let building_transform2 = model_transform.times(Mat4.scale(5,10,5)).times(Mat4.translation(-5,0,5));
        this.shapes.building.draw(context, program_state, building_transform2, this.materials.building);

        let building_transform3 = model_transform.times(Mat4.scale(10,10,5)).times(Mat4.translation(0,0,-5));
        this.shapes.building.draw(context, program_state, building_transform3, this.materials.building);

        const gun_transform = Mat4.inverse(program_state.camera_inverse).times(Mat4.translation(0, -5, -15)).times(Mat4.rotation(Math.PI/2, 0, 1, 0)).times(Mat4.scale(2, 2, 1)); 
        this.shapes.gun.draw(context, program_state, gun_transform, this.materials.gun);

        // this.sky_transform = Mat4.identity().times(Mat4.translation(0, 0, 0)).times(Mat4.scale(75, 75, 75));
        // this.shapes.sky.draw(context, program_state, this.sky_transform, this.materials.sky);
        
        // temporary sky fix
        const cube_transform = Mat4.inverse(program_state.camera_inverse).times(Mat4.translation(0, -4, -15)).times(Mat4.scale(75, 75, 75));
        this.shapes.cube.draw(context, program_state, cube_transform, this.materials.plastic.override({color: hex_color("#afeeee")}));  
    }
}