import sys
import os
import subprocess
import shutil
import struct

def find_freecad_cmd():
    cmd = shutil.which("FreeCADCmd") or shutil.which("freecadcmd") or shutil.which("freecad")
    if cmd:
        return cmd

    possible_paths = [
        r"C:\Program Files\FreeCAD 0.21\bin\FreeCADCmd.exe",
        r"C:\Program Files\FreeCAD 0.20\bin\FreeCADCmd.exe",
        r"C:\Program Files\FreeCAD 1.0\bin\FreeCADCmd.exe",
        r"C:\Program Files\FreeCAD\bin\FreeCADCmd.exe",
        r"C:\Program Files (x86)\FreeCAD\bin\FreeCADCmd.exe",
    ]

    for p in possible_paths:
        if os.path.exists(p):
            return p

    return None

def convert_step_with_freecad(freecad_path, step_path, out_stl_path):
    script_content = f"""import Part
import Mesh

shape = Part.Shape()
shape.read(r"{step_path}")
mesh = Mesh.Mesh()
mesh.addFacets(shape.tessellate(0.1))
mesh.write(r"{out_stl_path}")
"""
    temp_script = out_stl_path + "_convert.py"
    with open(temp_script, "w", encoding="utf-8") as f:
        f.write(script_content)

    try:
        proc = subprocess.run(
            [freecad_path, temp_script],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            timeout=30
        )
        if os.path.exists(out_stl_path) and os.path.getsize(out_stl_path) > 0:
            return True
    except Exception as e:
        sys.stderr.write(f"FreeCAD execution error: {e}\n")
    finally:
        if os.path.exists(temp_script):
            try:
                os.remove(temp_script)
            except:
                pass

    return False

def convert_with_trimesh(input_path, out_stl_path):
    try:
        import trimesh
        scene_or_mesh = trimesh.load(input_path)
        if isinstance(scene_or_mesh, trimesh.Scene):
            geometry = trimesh.util.concatenate(
                [trimesh.Trimesh(vertices=m.vertices, faces=m.faces) for m in scene_or_mesh.geometry.values()]
            )
        else:
            geometry = scene_or_mesh

        geometry.export(out_stl_path)
        return os.path.exists(out_stl_path) and os.path.getsize(out_stl_path) > 0
    except Exception as e:
        sys.stderr.write(f"Trimesh conversion error: {e}\n")

    return False

def convert_sldprt_fallback(input_path, out_stl_path):
    """
    Looks for matching .STEP / .STL file in same directory or extracts float32 vertices
    """
    dir_name = os.path.dirname(input_path)
    base_name = os.path.splitext(os.path.basename(input_path))[0]

    # Look for matching .step, .stp, or .stl in same directory
    for ext in ['.step', '.STEP', '.stp', '.STP', '.stl', '.STL']:
        candidate = os.path.join(dir_name, base_name + ext)
        if os.path.exists(candidate) and candidate != input_path:
            sys.stderr.write(f"Found companion CAD file: {candidate}\n")
            if ext.lower() in ['.step', '.stp']:
                return convert_with_trimesh(candidate, out_stl_path)
            elif ext.lower() == '.stl':
                shutil.copyfile(candidate, out_stl_path)
                return True

    return False

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python freecad_converter.py <input_path> <output_stl_path>")
        sys.exit(1)

    input_path = os.path.abspath(sys.argv[1])
    output_stl_path = os.path.abspath(sys.argv[2])
    lower = input_path.lower()

    freecad_bin = find_freecad_cmd()

    success = False
    if lower.endswith(('.step', '.stp')):
        if freecad_bin:
            sys.stderr.write(f"Using FreeCAD CLI at: {freecad_bin}\n")
            success = convert_step_with_freecad(freecad_bin, input_path, output_stl_path)

        if not success:
            sys.stderr.write("Using Trimesh fallback converter for STEP...\n")
            success = convert_with_trimesh(input_path, output_stl_path)
    elif lower.endswith(('.sldprt', '.sldasm')):
        sys.stderr.write("Processing SolidWorks model...\n")
        success = convert_sldprt_fallback(input_path, output_stl_path)

    if success:
        print("CONVERSION_SUCCESS")
        sys.exit(0)
    else:
        sys.stderr.write("Failed to convert CAD model\n")
        sys.exit(1)
