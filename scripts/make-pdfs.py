#!/usr/bin/env python3
"""Build AutoZap commercial-proposal PDFs for each partner."""

from __future__ import annotations

import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
TEMPLATE = ROOT / "docs" / "kp.template.html"
DOCS = ROOT / "docs"
OUT_DIR = ROOT / "kp"
CHROME = shutil.which("google-chrome-stable") or shutil.which("google-chrome") or "google-chrome"

PARTNERS = [
    {
        "name": "ООО «Бренд-Партс»",
        "doc_id": "BREND-PARTS",
        "file": "KP-AutoZap-OOO-Brend-Parts.pdf",
    },
    {
        "name": "ООО «СК-ОПТ-ШИНА»",
        "doc_id": "SK-OPT-SHINA",
        "file": "KP-AutoZap-OOO-SK-OPT-SHINA.pdf",
    },
    {
        "name": "ООО «СПЕЦСТАЛЬЗАПЧАСТЬ»",
        "doc_id": "SPECSTALZAPCHAST",
        "file": "KP-AutoZap-OOO-Specstalzapchast.pdf",
    },
    {
        "name": "ООО «АВТОЛАДА»",
        "doc_id": "AVTOLADA",
        "file": "KP-AutoZap-OOO-AvtoLada.pdf",
    },
    {
        "name": "ООО «ТПК „Трансснаб“»",
        "doc_id": "TPK-TRANSSNAB",
        "file": "KP-AutoZap-OOO-TPK-Transsnab.pdf",
    },
    {
        "name": "ООО «АВТОХАДОМ»",
        "doc_id": "AVTOHADOM",
        "file": "KP-AutoZap-OOO-AvtoHadom.pdf",
    },
    {
        "name": "ООО ТД «ЖИВАЯ СТАЛЬ»",
        "doc_id": "ZHIVAYA-STAL",
        "file": "KP-AutoZap-OOO-TD-Zhivaya-Stal.pdf",
    },
    {
        "name": "ООО «ТРАНСКАВКАЗ»",
        "doc_id": "TRANSKAVKAZ",
        "file": "KP-AutoZap-OOO-Transkavkaz.pdf",
    },
]


def render(partner: str, doc_id: str) -> str:
    html = TEMPLATE.read_text(encoding="utf-8")
    return html.replace("{{PARTNER}}", partner).replace("{{DOC_ID}}", doc_id)


def print_pdf(html_path: Path, pdf_path: Path) -> None:
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--hide-scrollbars",
        "--allow-file-access-from-files",
        f"--print-to-pdf={pdf_path}",
        html_path.as_uri(),
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)


def main() -> int:
    if not TEMPLATE.exists():
        print("Missing template", TEMPLATE, file=sys.stderr)
        return 1
    OUT_DIR.mkdir(exist_ok=True)
    build_dir = DOCS / "build"
    build_dir.mkdir(exist_ok=True)
    shutil.copy2(DOCS / "logo.jpg", build_dir / "logo.jpg")

    for item in PARTNERS:
        html = render(item["name"], item["doc_id"])
        html_path = build_dir / f"{item['doc_id']}.html"
        html_path.write_text(html, encoding="utf-8")
        pdf_path = OUT_DIR / item["file"]
        print_pdf(html_path, pdf_path)
        print(f"Wrote {pdf_path.name}  ({item['name']})")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
