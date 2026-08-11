import sys
import os
import re

def center_step_file(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} not found.")
        sys.exit(1)

    print(f"Reading STEP file {file_path}...")
    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    # Match CARTESIAN_POINT ( '...', ( X, Y, Z ) )
    point_regex = re.compile(r"(CARTESIAN_POINT\s*\(\s*[^,]*\s*,\s*\(\s*)([-\d.eE+]+)(\s*,\s*)([-\d.eE+]+)(\s*,\s*)([-\d.eE+]+)(\s*\)\s*\))", re.IGNORECASE)

    points = []
    matches = list(point_regex.finditer(content))

    for m in matches:
        x, y, z = float(m.group(2)), float(m.group(4)), float(m.group(6))
        points.append([x, y, z])

    if not points:
        print("No CARTESIAN_POINT coordinates found in STEP file.")
        sys.exit(1)

    # Calculate bounding box center
    xs = [p[0] for p in points]
    ys = [p[1] for p in points]
    zs = [p[2] for p in points]

    cx = (min(xs) + max(xs)) / 2.0
    cy = (min(ys) + max(ys)) / 2.0
    cz = (min(zs) + max(zs)) / 2.0

    print(f"Found {len(points)} 3D points. Original bounding box center: [{cx}, {cy}, {cz}]")

    # Replace each CARTESIAN_POINT in file with centered coordinates
    def replacer(m):
        prefix = m.group(1)
        x = float(m.group(2)) - cx
        sep1 = m.group(3)
        y = float(m.group(4)) - cy
        sep2 = m.group(5)
        z = float(m.group(6)) - cz
        suffix = m.group(7)
        return f"{prefix}{x:.15f}{sep1}{y:.15f}{sep2}{z:.15f}{suffix}"

    new_content = point_regex.sub(replacer, content)

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

    print(f"Successfully centered {file_path} origin coordinates to (0, 0, 0) on disk!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        step_path = os.path.join("public", "models", "bladeless-fan.step")
    else:
        step_path = sys.argv[1]

    center_step_file(step_path)
