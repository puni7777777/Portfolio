import sys
import os
import trimesh
import numpy as np

def center_stl_file(file_path):
    if not os.path.exists(file_path):
        print(f"Error: File {file_path} not found.")
        sys.exit(1)

    print(f"Loading {file_path}...")
    mesh = trimesh.load(file_path)

    # Compute bounding box center
    bounds = mesh.bounds
    center = (bounds[0] + bounds[1]) / 2.0
    print(f"Original bounding box center: {center}")

    # Shift vertices so bounding box center is at (0, 0, 0)
    mesh.vertices -= center

    # Save centered STL
    mesh.export(file_path)
    print(f"Successfully centered STL origin coordinates at (0, 0, 0) for {file_path}!")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        stl_path = os.path.join("public", "models", "bladeless-fan.stl")
    else:
        stl_path = sys.argv[1]

    center_stl_file(stl_path)
