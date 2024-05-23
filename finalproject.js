import {defs, tiny} from './examples/common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Matrix, Mat4, Light, Shape, Material, Scene,
} = tiny;

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

class Cube_Outline extends Shape {
    constructor() {
        super("position", "color");
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

            'floor': new Cube(),
        };

        // *** Materials
        this.materials = {
            plastic: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            floor: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#0000ff")}),
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

export class Assignment2 extends Base_Scene {
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
    }

    draw_box(context, program_state, model_transform, boxnum, scalenum) {
        // TODO:  Helper function for requirement 3 (see hint).
        //        This should make changes to the model_transform matrix, draw the next box, and return the newest model_transform.
        // Hint:  You can add more parameters for this function, like the desired color, index of the box, etc.
        const bc = this.boxcolors[boxnum];
        const maxAngle = 0.5*Math.PI/8;
        const t = this.t = program_state.animation_time / 1000;
        var rotAngle = 0;
        if (this.sitstill)
        {
            rotAngle = maxAngle;
        }
        else
        {
            if(boxnum == 0)
            {
                rotAngle = 0;
            }
            else
            {
                rotAngle = ((maxAngle/2)+(maxAngle/2)*(Math.sin(Math.PI*(t))));
            }
        }

        model_transform = model_transform.times(Mat4.translation(-1,scalenum,0)).times(Mat4.rotation(rotAngle,0,0,1)).times(Mat4.translation(1,-scalenum,0)).times(Mat4.translation(0,2*scalenum,0));
        // model_transform = model_transform.times(Mat4.scale(1,scalenum,1));
        // model_transform = model_transform.times(Mat4.translation(0,num,0));
        if(this.borders)
        {
            // this.shapes.Cube_Outline.draw(context, program_state, model_transform);
            this.shapes.outline.draw(context, program_state, model_transform, this.white, "LINES");
        }
        else
        {
            if(boxnum % 2 == 0)
            {
                this.shapes.strip.draw(context, program_state, model_transform.times(Mat4.scale(1,scalenum,1)), this.materials.plastic.override({color:bc}),"TRIANGLE_STRIP");
            }
            else
            {
                this.shapes.cube.draw(context, program_state, model_transform.times(Mat4.scale(1,scalenum,1)), this.materials.plastic.override({color:bc}));
            }
        }
        // this.shapes.cube.draw(context, program_state, model_transform, this.materials.plastic.override({color:boxColor}));
        // model_transform = model_transform.times(Mat4.scale(1, (1/scalenum), 1));
        return model_transform;
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

        // super.display(context, program_state);
        const blue = hex_color("#1a9ffa");
        let model_transform = Mat4.identity();

        // Example for drawing a cube, you can remove this line if needed
        // this.shapes.cube.draw(context, program_state, model_transform, this.materials.plastic.override({color:blue}));
        // TODO:  Draw your entire scene here.  Use this.draw_box( graphics_state, model_transform ) to call your helper.
        model_transform = this.draw_box(context, program_state, model_transform, 0, 1);

        let t = program_state.animation_time;

        let floor = model_transform.times(Mat4.scale(150, 0.5, 150)).times(Mat4.translation(0, -10, 0));
        this.shapes.floor.draw(context, program_state, floor, this.materials.floor)
        
        
        const bottom_center = Mat4.inverse(program_state.camera_inverse)
                                 .times(Mat4.translation(0, -5, -15)); // Adjust the translation values as needed
        const center_color = hex_color("#ff0000");

        this.shapes.cube.draw(context, program_state, bottom_center, this.materials.plastic.override({color: center_color}));

    }
}