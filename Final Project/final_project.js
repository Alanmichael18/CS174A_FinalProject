import {defs, tiny} from './common.js';

const {
    Vector, Vector3, vec, vec3, vec4, color, hex_color, Shader, Matrix, Mat4, Light, Shape, Material, Scene, Texture
} = tiny;

const {Cube, Textured_Phong} = defs

// define the shape of the gun
// a gun = a cylinder (barrel) stuck on top of a stretched cube (grip),
// with metallic texture applied on the surface
const gun = defs.gun =
    class gun extends Shape {constructor() {
        super("position", "normal", "texture_coord");
            //cylinder points down the z-direction
            const barrel_length = Mat4.scale(0.6,0.6, 3);

            defs.Capped_Cylinder.insert_transformed_copy_into(this, [10, 10], barrel_length);
        }
    }

const zombie = defs.zombie =
    class z1 extends Shape {constructor() {
        super("position", "normal", "texture_coord");

        const head = Mat4.scale(1, 1,1);
        const body = Mat4.scale(1.5, 2, 1);
        const legs = Mat4.scale(0.5, 1.5, 0.5);

        defs.Cube.insert_transformed_copy_into(this, [10, 10], head.times(Mat4.translation(0,4,0)));
        defs.Cube.insert_transformed_copy_into(this, [] , body.times(Mat4.translation(0, 0.25, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(-1.5,-2, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(1.5,-2, 0)));
    }
    }

const conehead_zombie = defs.conehead_zombie =
    class z2 extends Shape {constructor() {
        super("position", "normal", "texture_coord");

        const cone = Mat4.scale(1, 1, 1);
        const head = Mat4.scale(1, 1,1);
        const body = Mat4.scale(1.5, 2, 1);
        const legs = Mat4.scale(0.5, 1.5, 0.5);

        defs.Cone_Tip.insert_transformed_copy_into(this, [10, 10, [[0.5, 1], [0, 1]]], cone.times(Mat4.translation(0, 6, 0)).times(Mat4.rotation(-Math.PI/2, 1, 0, 0)).times(Mat4.scale(1, 2, 1)));
        defs.Cube.insert_transformed_copy_into(this, [10, 10], head.times(Mat4.translation(0,4,0)));
        // move the cube down
        defs.Cube.insert_transformed_copy_into(this, [] , body.times(Mat4.translation(0, 0.25, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(-1.5,-2, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(1.5,-2, 0)));
    }
    }

const small_dance_zombie = defs.small_dance_zombie =
    class z3 extends Shape {constructor() {
        super("position", "normal", "texture_coord");

        const cone = Mat4.scale(1, 1, 1);
        const head = Mat4.scale(1, 1,1);
        const body = Mat4.scale(1.5, 2, 1);
        const left_leg = Mat4.scale(1.5, 0.5, 1.5);
        const right_leg = Mat4.scale(0.5, 1.5, 0.5);

        defs.Cone_Tip.insert_transformed_copy_into(this, [], cone.times(Mat4.translation(0, 6, 0)));
        defs.Cube.insert_transformed_copy_into(this, [10, 10], head.times(Mat4.translation(0,4,0)));
        // move the cube down
        defs.Cube.insert_transformed_copy_into(this, [] , body.times(Mat4.translation(0, 0.25, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , left_leg.times(Mat4.translation(-1.5,-2, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , right_leg.times(Mat4.translation(1.5,-2, 0)));
    }
    }

const dance_zombie = defs.dance_zombie =
    class z4 extends Shape {constructor() {
        super("position", "normal", "texture_coord");

        const head = Mat4.scale(1, 1,1);
        const body = Mat4.scale(1.5, 2, 1);
        const legs = Mat4.scale(0.5, 1.5, 0.5);
        const hands = Mat4.scale(1.5, 0.5, 0.5);

        defs.Cube.insert_transformed_copy_into(this, [10, 10], head.times(Mat4.translation(0,4,0)));
        defs.Cube.insert_transformed_copy_into(this, [] , body.times(Mat4.translation(0, 0.25, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , hands.times(Mat4.translation(-1.5,3.5, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , hands.times(Mat4.translation(1.5,3.5, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(-1.5,-2, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(1.5,-2, 0)));
    }
    }

const giant_zombie = defs.giant_zombie =
    class z1 extends Shape {constructor() {
        super("position", "normal", "texture_coord");

        const head = Mat4.scale(1, 1,2);
        const body = Mat4.scale(5, 3, 5);
        const legs = Mat4.scale(0.5, 0.5, 0.5);

        defs.Cube.insert_transformed_copy_into(this, [10, 10], head.times(Mat4.translation(0,4,0)));
        defs.Cube.insert_transformed_copy_into(this, [] , body.times(Mat4.translation(0, 0.25, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(-5,-5, 0)));
        defs.Cube.insert_transformed_copy_into(this, [] , legs.times(Mat4.translation(5,-5, 0)));
    }
    }

const plant = defs.plant =
    class p extends Shape {constructor() {
        super("position", "normal", "texture_coord");

        const plant_base = Mat4.scale(3, 0.25, 3);
        const body = Mat4.scale(0.5, 3, 0.5);

        defs.Cube.insert_transformed_copy_into(this, [10, 10], plant_base.times(Mat4.translation(0,4,0)));
        defs.Cube.insert_transformed_copy_into(this, [10, 10], body.times(Mat4.translation(0,1,0)));
    }
    }


export class Final_project extends Scene {
    constructor() {
        // constructor(): Scenes begin by populating initial values like the Shapes and Materials they'll need.
        super();

        // At the beginning of our program, load one of each of these shape definitions onto the GPU.
        this.shapes = {
            torus: new defs.Torus(15, 15),
            torus2: new defs.Torus(3, 15),
            sphere: new defs.Subdivision_Sphere(4),
            circle: new defs.Regular_2D_Polygon(1, 15),
            ring: new defs.Torus(50, 50),
            //11/26 CL
            sky: new defs.Subdivision_Sphere(4),
            horizon: new Cube(),
            zombie: new defs.zombie,
            conehead_zombie: new defs.conehead_zombie(),
            dance_zombie: new defs.dance_zombie(),
            small_zombie: new defs.small_dance_zombie(),
            giant_zombie: new defs.giant_zombie(),
            plant: new defs.plant(),
            gun: new defs.gun(),
            cone: new defs.Cone_Tip(10, 20)
        };

        // *** Materials
        this.materials = {
            test: new Material(new defs.Phong_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#ffffff")}),
            test2: new Material(new Gouraud_Shader(),
                {ambient: .4, diffusivity: .6, color: hex_color("#992828")}),
            //ring: new Material(new Ring_Shader()),
            // TODO:  Fill in as many additional material objects as needed in this key/value table.
            //        (Requirement 4)
            //sun material
            sun: new Material(new defs.Phong_Shader(),
                //color defaults to red
                {ambient: 1, diffusivity: 1, color: hex_color("#3b3f3d")}),


            dance_zombie: new Material(new Ring_Shader(),
                {ambient: 1, diffusivity: 0, color: color(0, 1.0, 0, 1), specularity: 0, smoothness: 0}),

            small_zombie: new Material(new Ring_Shader(),
                {ambient: 1, diffusivity: 1, color: color(0.5, 0.5, 1.0, 1), specularity: 0, smoothness: 0}),

            sky: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/sky.png", "NEAREST")
            }),

            horizon: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/grass.png", "NEAREST")}),

            zombie_m: new Material(new defs.Phong_Shader(), {
                color: hex_color("#337319"),
                ambient: 0.5

            }),

            gun: new Material(new Textured_Phong(), {
                color: hex_color("#000000"),
                ambient: 1,
                texture: new Texture("assets/metallic.png", "NEAREST")}),

            cone: new Material(new Textured_Phong(), {
                color: hex_color("#FF7900"),
                ambient: 0.25}
            )

        }

        this.initial_camera_location = Mat4.look_at(vec3(0, 0, 25), vec3(0, 0, 0), vec3(0, 1, 0));
        this.sky_transform = Mat4.identity().times(Mat4.translation(0, 0, 0)).times(Mat4.scale(100, 100, 100));
        this.animation_queue = [];
    }

    make_control_panel(program_state) {
        this.key_triggered_button("Origin", ["Control", "0"], () => this.attached = () => null);
        this.new_line();
        this.key_triggered_button("View shooter", ["Control", "0"], () => this.attached = () => this.shooter);
    }

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

    //calculates the dx, dy value to adujst the first-person camera based on mouse inputs
    //the user needs to register a mouse click before being able to move the camera with the mouse
    // FPSCamera(context, program_state){
    //     let X = 0;
    //     let Y = 0;
    //     let mouse_move = false;
    //
    //     //listen for mouse click to begin adjusting the camera
    //     document.addEventListener('mousedown', (event) => {
    //         mouse_move = true;
    //     });
    //
    //     // Add event listeners for mouse movements
    //     document.addEventListener('mousedown', (event) => {
    //         X = event.clientX;
    //         Y = event.clientY;
    //     });
    //
    //     document.addEventListener('mousemove', (event) => {
    //         // Calculate the change in mouse position
    //         if (mouse_move){
    //             let deltaX = event.clientX - X;
    //             let deltaY = event.clientY - Y;
    //
    //             // Update the camera orientation based on mouse movement
    //             const sensitivity = 0.1; // Adjust sensitivity as needed
    //             let moveX = Mat4.translation(deltaX * sensitivity, 0, 0);
    //             let moveY = Mat4.translation(0, deltaY * sensitivity, 0);
    //             let rotateX = Mat4.rotation(deltaY * sensitivity, 1, 0, 0);
    //             let rotateY = Mat4.rotation(deltaX * sensitivity, 0, 1, 0);
    //
    //             // Combine rotations to update the camera orientation
    //             this.initial_camera_location = this.initial_camera_location.times(moveX)
    //                 .times(rotateX)
    //                 .times(moveY)
    //                 .times(rotateY);
    //
    //             // Update previous mouse position
    //             X = event.clientX;
    //             Y = event.clientY;
    //         }
    //     });
    //
    // }

    display(context, program_state) {
        // display():  Called once per frame of animation.
        // Setup -- This part sets up the scene's overall camera matrix, projection matrix, and lights:
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
            Math.PI / 4, context.width / context.height, .1, 1000);

        // program_state.projection_transform = orthographic_proj;

        const light_position = vec4(10, 10, 10, 1);
        program_state.lights = [new Light(light_position, color(1, 1, 1, 1), 1000)];

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
                        position[1] -= 0.5 * 9.8 * ((t - start_time) / 1000) ** 2;
                    }

                    let model_trans = Mat4.translation(position[0], position[1], position[2])
                        .times(Mat4.rotation(animation_process * 50, .3, .6, .2))
                    this.shapes.sphere.draw(context, program_state, model_trans, this.materials.sun.override({color: color(0, 1, 0, 1)}));
                }
            }
        }
        // remove finished animation
        while (this.animation_queue.length > 0) {
            if (t > this.animation_queue[0].end_time) {
                this.animation_queue.shift();
            }
            else {
                break;
            }
        }

        //Sun Operations
        const ms = program_state.animation_time/1000;
        let model_transform = Mat4.identity();

        let center = model_transform.times(Mat4.scale(0.5, 0.5, 0.1));
        let target_color = color(1, 0, 0, 1);
        //this.shapes.sphere.draw(context, program_state, center, this.materials.sun.override({color: target_color}));
        center = center.times(Mat4.scale(2.0, 2.0, 10.0));
        let ring = center.times(Mat4.scale(3, 3, 0.1));
        //this.shapes.ring.draw(context, program_state, ring, this.materials.ring);

        this.shapes.sky.draw(context, program_state, this.sky_transform, this.materials.sky);

        let horizon = model_transform.times(Mat4.scale(150, 0.5, 150)).times(Mat4.translation(0, -10, 0));
        this.shapes.horizon.draw(context, program_state, horizon, this.materials.horizon)

        //draw zombie, vanilla
        let zombie_transform = model_transform.times(Mat4.translation(0, 0, 0))
            .times(Mat4.translation(0, 0, 2 * Math.sin(ms)));
        this.shapes.zombie.draw(context, program_state, zombie_transform, this.materials.zombie_m);

        //draw conehead zombie
        let conehead_zombie_transform = model_transform.times(Mat4.translation(10,0,-20))
            .times(Mat4.translation(0, 0, 3 * Math.sin(ms)));
        this.shapes.zombie.draw(context, program_state, conehead_zombie_transform, this.materials.zombie_m);
        let cone_transform = conehead_zombie_transform.times(Mat4.translation(0,6.5,0)).times(Mat4.rotation(-Math.PI/2, 1, 0, 0)).times(Mat4.scale(1, 2, 1));
        this.shapes.cone.draw(context, program_state, cone_transform, this.materials.cone);

        //draw dance zombie
        let dance_zombie_transform = model_transform.times(Mat4.translation(-15,0,-20)).times(Mat4.translation(2*Math.sin(ms), 0, 0));
        this.shapes.dance_zombie.draw(context, program_state, dance_zombie_transform, this.materials.zombie_m);
        let z1_transform = dance_zombie_transform.times(Mat4.rotation(ms, 0, 1, 0))
            .times(Mat4.translation(8,-2,0))
            .times(Mat4.scale(0.5, 0.5, 0.5));
        this.shapes.small_zombie.draw(context, program_state, z1_transform, this.materials.small_zombie);
        let z2_transform = dance_zombie_transform.times(Mat4.rotation(ms, 0, 1, 0))
            .times(Mat4.translation(-8,-2,0))
            .times(Mat4.scale(0.5, 0.5, 0.5));
        this.shapes.small_zombie.draw(context, program_state, z2_transform, this.materials.small_zombie);
        let z3_transform = dance_zombie_transform.times(Mat4.rotation(ms, 0, 1, 0))
            .times(Mat4.translation(0,-2,8))
            .times(Mat4.scale(0.5, 0.5, 0.5));
        this.shapes.small_zombie.draw(context, program_state, z3_transform, this.materials.small_zombie);
        let z4_transform = dance_zombie_transform.times(Mat4.rotation(ms, 0, 1, 0))
            .times(Mat4.translation(0,-2,-8))
            .times(Mat4.scale(0.5, 0.5, 0.5));
        this.shapes.small_zombie.draw(context, program_state, z4_transform, this.materials.small_zombie);

        // shooter
        let plant_transform = model_transform.times(Mat4.translation(0, -5.5, 30));
        this.shapes.plant.draw(context, program_state, plant_transform, this.materials.zombie_m);
        let head_transform = plant_transform.times(Mat4.translation(0, 5.5, 0));
        this.shapes.sphere.draw(context, program_state, head_transform, this.materials.sun);
        let gun_transform = head_transform.times(Mat4.rotation(Math.PI * 2 / 3 * ms,0,0,1))
            .times(Mat4.translation(0, 0, -1.5));
        this.shapes.gun.draw(context, program_state, gun_transform, this.materials.gun);

        let blending_factor = 0.1;
        this.shooter = head_transform;
        if (typeof this.attached !== 'undefined') {
            if (this.attached() != null) {
                let desired = Mat4.inverse(this.attached().times(Mat4.translation(-10, 0, 20)));
                program_state.camera_inverse = desired.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, blending_factor));
            } else {
                program_state.camera_inverse = this.initial_camera_location.map((x, i) => Vector.from(program_state.camera_inverse[i]).mix(x, blending_factor));
            }
        }

    }
}

class Gouraud_Shader extends Shader {
    // This is a Shader using Phong_Shader as template
    // TODO: Modify the glsl coder here to create a Gouraud Shader (Planet 2)

    constructor(num_lights = 2) {
        super();
        this.num_lights = num_lights;
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return ` 
        precision mediump float;
        const int N_LIGHTS = ` + this.num_lights + `;
        uniform float ambient, diffusivity, specularity, smoothness;
        uniform vec4 light_positions_or_vectors[N_LIGHTS], light_colors[N_LIGHTS];
        uniform float light_attenuation_factors[N_LIGHTS];
        uniform vec4 shape_color;
        uniform vec3 squared_scale, camera_center;

        // Specifier "varying" means a variable's final value will be passed from the vertex shader
        // on to the next phase (fragment shader), then interpolated per-fragment, weighted by the
        // pixel fragment's proximity to each of the 3 vertices (barycentric interpolation).
        varying vec3 N, vertex_worldspace;
        varying vec3 vertex_color;
        
        // ***** PHONG SHADING HAPPENS HERE: *****                                       
        vec3 phong_model_lights( vec3 N, vec3 vertex_worldspace ){                                        
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the 
                // light will appear directional (uniform direction from all points), and we 
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to 
                // the point light's location from the current surface point.  In either case, 
                // fade (attenuate) the light as the vector needed to reach it gets longer.  
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz - 
                                               light_positions_or_vectors[i].w * vertex_worldspace;                                             
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );
                
                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
                        
            return result;
        } 
        
        vec3 gouraud_lights( vec3 N, vec3 vertex_worldspace ){                                        
            // phong_model_lights():  Add up the lights' contributions.
            vec3 E = normalize( camera_center - vertex_worldspace );
            vec3 result = vec3( 0.0 );
            for(int i = 0; i < N_LIGHTS; i++){
                // Lights store homogeneous coords - either a position or vector.  If w is 0, the 
                // light will appear directional (uniform direction from all points), and we 
                // simply obtain a vector towards the light by directly using the stored value.
                // Otherwise if w is 1 it will appear as a point light -- compute the vector to 
                // the point light's location from the current surface point.  In either case, 
                // fade (attenuate) the light as the vector needed to reach it gets longer.  
                vec3 surface_to_light_vector = light_positions_or_vectors[i].xyz - 
                                               light_positions_or_vectors[i].w * vertex_worldspace;                                             
                float distance_to_light = length( surface_to_light_vector );

                vec3 L = normalize( surface_to_light_vector );
                vec3 H = normalize( L + E );
                // Compute the diffuse and specular components from the Phong
                // Reflection Model, using Blinn's "halfway vector" method:
                float diffuse  =      max( dot( N, L ), 0.0 );
                float specular = pow( max( dot( N, H ), 0.0 ), smoothness );
                float attenuation = 1.0 / (1.0 + light_attenuation_factors[i] * distance_to_light * distance_to_light );
                
                vec3 light_contribution = shape_color.xyz * light_colors[i].xyz * diffusivity * diffuse
                                                          + light_colors[i].xyz * specularity * specular;
                result += attenuation * light_contribution;
            }
                        
            return result;
        } 
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        return this.shared_glsl_code() + `
            attribute vec3 position, normal;                            
            // Position is expressed in object coordinates.
            
            uniform mat4 model_transform;
            uniform mat4 projection_camera_model_transform;
                
            void main(){                                                                   
                // The vertex's final resting place (in NDCS):
                gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
                // The final normal vector in screen space.
                                
                vertex_color = gouraud_lights( normalize( N ), vertex_worldspace );
            } `;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // A fragment is a pixel that's overlapped by the current triangle.
        // Fragments affect the final image or get discarded due to depth.
        return this.shared_glsl_code() + `
            void main(){                                                           
                // Compute an initial (ambient) color:
                //gl_FragColor = vec4( shape_color.xyz * ambient, shape_color.w );
                // Compute the final color with contributions from lights:
                //gl_FragColor.xyz += phong_model_lights( normalize( N ), vertex_worldspace );
                
                //gl_FragColor = vertex_color;
                gl_FragColor = vec4( vertex_color.xyz, 1.0 );
            } `;
    }

    send_material(gl, gpu, material) {
        // send_material(): Send the desired shape-wide material qualities to the
        // graphics card, where they will tweak the Phong lighting formula.
        gl.uniform4fv(gpu.shape_color, material.color);
        gl.uniform1f(gpu.ambient, material.ambient);
        gl.uniform1f(gpu.diffusivity, material.diffusivity);
        gl.uniform1f(gpu.specularity, material.specularity);
        gl.uniform1f(gpu.smoothness, material.smoothness);
    }

    send_gpu_state(gl, gpu, gpu_state, model_transform) {
        // send_gpu_state():  Send the state of our whole drawing context to the GPU.
        const O = vec4(0, 0, 0, 1), camera_center = gpu_state.camera_transform.times(O).to3();
        gl.uniform3fv(gpu.camera_center, camera_center);
        // Use the squared scale trick from "Eric's blog" instead of inverse transpose matrix:
        const squared_scale = model_transform.reduce(
            (acc, r) => {
                return acc.plus(vec4(...r).times_pairwise(r))
            }, vec4(0, 0, 0, 0)).to3();
        gl.uniform3fv(gpu.squared_scale, squared_scale);
        // Send the current matrices to the shader.  Go ahead and pre-compute
        // the products we'll need of the of the three special matrices and just
        // cache and send those.  They will be the same throughout this draw
        // call, and thus across each instance of the vertex shader.
        // Transpose them since the GPU expects matrices as column-major arrays.
        const PCM = gpu_state.projection_transform.times(gpu_state.camera_inverse).times(model_transform);
        gl.uniformMatrix4fv(gpu.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        gl.uniformMatrix4fv(gpu.projection_camera_model_transform, false, Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Omitting lights will show only the material color, scaled by the ambient term:
        if (!gpu_state.lights.length)
            return;

        const light_positions_flattened = [], light_colors_flattened = [];
        for (let i = 0; i < 4 * gpu_state.lights.length; i++) {
            light_positions_flattened.push(gpu_state.lights[Math.floor(i / 4)].position[i % 4]);
            light_colors_flattened.push(gpu_state.lights[Math.floor(i / 4)].color[i % 4]);
        }
        gl.uniform4fv(gpu.light_positions_or_vectors, light_positions_flattened);
        gl.uniform4fv(gpu.light_colors, light_colors_flattened);
        gl.uniform1fv(gpu.light_attenuation_factors, gpu_state.lights.map(l => l.attenuation));
    }

    update_GPU(context, gpu_addresses, gpu_state, model_transform, material) {
        // update_GPU(): Define how to synchronize our JavaScript's variables to the GPU's.  This is where the shader
        // recieves ALL of its inputs.  Every value the GPU wants is divided into two categories:  Values that belong
        // to individual objects being drawn (which we call "Material") and values belonging to the whole scene or
        // program (which we call the "Program_State").  Send both a material and a program state to the shaders
        // within this function, one data field at a time, to fully initialize the shader for a draw.

        // Fill in any missing fields in the Material object with custom defaults for this shader:
        const defaults = {color: color(0, 0, 0, 1), ambient: 0, diffusivity: 1, specularity: 1, smoothness: 40};
        material = Object.assign({}, defaults, material);

        this.send_material(context, gpu_addresses, material);
        this.send_gpu_state(context, gpu_addresses, gpu_state, model_transform);
    }
}

class Ring_Shader extends Shader {
    update_GPU(context, gpu_addresses, graphics_state, model_transform, material) {
        // update_GPU():  Defining how to synchronize our JavaScript's variables to the GPU's:
        const [P, C, M] = [graphics_state.projection_transform, graphics_state.camera_inverse, model_transform],
            PCM = P.times(C).times(M);
        context.uniformMatrix4fv(gpu_addresses.model_transform, false, Matrix.flatten_2D_to_1D(model_transform.transposed()));
        context.uniformMatrix4fv(gpu_addresses.projection_camera_model_transform, false,
            Matrix.flatten_2D_to_1D(PCM.transposed()));

        // Set uniform parameters
        context.uniform4fv(gpu_addresses.shape_color, material.color);
    }

    shared_glsl_code() {
        // ********* SHARED CODE, INCLUDED IN BOTH SHADERS *********
        return `
        precision mediump float;
        varying vec4 point_position;
        `;
    }

    vertex_glsl_code() {
        // ********* VERTEX SHADER *********
        // TODO:  Complete the main function of the vertex shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        attribute vec3 position, normal;
        uniform mat4 model_transform;
        uniform mat4 projection_camera_model_transform;
        
        void main(){
          gl_Position = projection_camera_model_transform * vec4( position, 1.0 );
          point_position = model_transform * vec4( position, 1.0 );
        }`;
    }

    fragment_glsl_code() {
        // ********* FRAGMENT SHADER *********
        // TODO:  Complete the main function of the fragment shader (Extra Credit Part II).
        return this.shared_glsl_code() + `
        uniform vec4 shape_color;
        uniform vec4 second_color;
        void main(){
          float factor = 0.5 + 0.5 * sin(point_position.x * 10.0);
          vec4 mixed_color =  factor * shape_color + (1.0 - factor) * second_color;
          gl_FragColor = mixed_color;
        }`;
    }
}

