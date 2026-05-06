from pathlib import Path

def getAllJsFilesFromDir(dir: str):
    path = Path(dir)
    ret = []
    for item in path.iterdir():
        if item.is_file() and item.name.endswith(".js") and not item.name.find("globalVariables") and not item.name.find("classes"):
            ret.append(item.name)
    return ret

def make_index_with_scripts(js_dir: str, template_path: str = "./template.html", out_path: str = "index.html"):
    js_files = getAllJsFilesFromDir(js_dir)
    template = Path(template_path).read_text(encoding="utf-8")

    # Build script tags (relative paths using js_dir)
    scripts = "\n".join(f'            <script type="module" src="{Path(js_dir) / name}"></script>' for name in js_files)

    # Insert scripts just before </body>. If no </body>, append at end.
    if "</body>" in template:
        new_html = template.replace("</body>", f"            {scripts}\n        </body>", 1)
    else:
        new_html = template + "\n" + scripts

    Path(out_path).write_text(new_html, encoding="utf-8")
    return out_path

# Example usage:
make_index_with_scripts("./scripts", "./template.html", "index.html")
