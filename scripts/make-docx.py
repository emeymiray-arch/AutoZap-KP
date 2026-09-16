#!/usr/bin/env python3
"""Word-файлы КП: открыть и сохранить как PDF."""

from __future__ import annotations

from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH, WD_LINE_SPACING
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
LOGO = ROOT / "docs" / "logo-round.png"
OUT_DIR = ROOT / "docx"

BLUE = RGBColor(0x0B, 0x4A, 0xA2)
INK = RGBColor(0x1C, 0x24, 0x30)
MUTED = RGBColor(0x5B, 0x6B, 0x7C)

PARTNERS = [
    ("01", "ООО «Бренд-Партс»", "BREND-PARTS", "OOO-Brend-Parts"),
    ("02", "ООО «СК-ОПТ-ШИНА»", "SK-OPT-SHINA", "OOO-SK-OPT-SHINA"),
    ("03", "ООО «СПЕЦСТАЛЬЗАПЧАСТЬ»", "SPECSTALZAPCHAST", "OOO-Specstalzapchast"),
    ("04", "ООО «АВТОЛАДА»", "AVTOLADA", "OOO-AvtoLada"),
    ("05", "ООО «ТПК „Трансснаб“»", "TPK-TRANSSNAB", "OOO-TPK-Transsnab"),
    ("06", "ООО «АВТОХАДОМ»", "AVTOHADOM", "OOO-AvtoHadom"),
    ("07", "ООО ТД «ЖИВАЯ СТАЛЬ»", "ZHIVAYA-STAL", "OOO-TD-Zhivaya-Stal"),
    ("08", "ООО «ТРАНСКАВКАЗ»", "TRANSKAVKAZ", "OOO-Transkavkaz"),
]

APPS = [
    (
        "Android — Google Play",
        "https://play.google.com/store/apps/details?id=com.unnamedii.autozapmobile",
    ),
    ("iPhone — App Store", "https://apps.apple.com/ru/app/autozap/id6772788391"),
    (
        "RuStore",
        "https://www.rustore.ru/catalog/app/com.unnamedii.autozapmobile",
    ),
]


def set_run(run, *, size=11, bold=False, color=INK, name="Calibri"):
    run.font.size = Pt(size)
    run.bold = bold
    run.font.color.rgb = color
    run.font.name = name
    r = run._element
    rPr = r.get_or_add_rPr()
    rFonts = rPr.find(qn("w:rFonts"))
    if rFonts is None:
        rFonts = OxmlElement("w:rFonts")
        rPr.append(rFonts)
    rFonts.set(qn("w:ascii"), name)
    rFonts.set(qn("w:hAnsi"), name)
    rFonts.set(qn("w:cs"), name)
    rFonts.set(qn("w:eastAsia"), name)


def shade(cell, hex_color: str) -> None:
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:fill"), hex_color)
    shd.set(qn("w:val"), "clear")
    tcPr.append(shd)


def set_cell_border(cell, **kwargs) -> None:
    tc = cell._tc
    tcPr = tc.get_or_add_tcPr()
    tcBorders = OxmlElement("w:tcBorders")
    for edge, val in kwargs.items():
        el = OxmlElement(f"w:{edge}")
        el.set(qn("w:val"), val.get("val", "single"))
        el.set(qn("w:sz"), val.get("sz", "8"))
        el.set(qn("w:color"), val.get("color", "0A78F0"))
        el.set(qn("w:space"), "0")
        tcBorders.append(el)
    tcPr.append(tcBorders)


def add_bottom_border(paragraph, color="0A78F0", sz="18") -> None:
    pPr = paragraph._p.get_or_add_pPr()
    pBdr = OxmlElement("w:pBdr")
    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), sz)
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), color)
    pBdr.append(bottom)
    pPr.append(pBdr)


def heading(doc, text: str) -> None:
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run(text)
    set_run(run, size=14, bold=True, color=BLUE)


def body(doc, text: str, *, justify=True) -> None:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.space_before = Pt(0)
    p.paragraph_format.line_spacing_rule = WD_LINE_SPACING.SINGLE
    if justify:
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    run = p.add_run(text)
    set_run(run, size=11)


def offer(doc, n: int, title: str, text: str) -> None:
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.left_indent = Cm(0.5)
    p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
    run = p.add_run(f"{n}. {title} ")
    set_run(run, size=11, bold=True)
    run = p.add_run(text)
    set_run(run, size=11)


def sign_line(doc, label: str) -> None:
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    p.paragraph_format.space_after = Pt(2)
    run = p.add_run(label)
    set_run(run, size=11, bold=True)
    line = doc.add_paragraph()
    add_bottom_border(line, color="8B97A6", sz="8")
    line.paragraph_format.space_after = Pt(0)
    hint = doc.add_paragraph()
    hint.paragraph_format.space_after = Pt(2)
    run = hint.add_run("Должность, подпись, расшифровка")
    set_run(run, size=9, color=MUTED)
    line2 = doc.add_paragraph()
    add_bottom_border(line2, color="8B97A6", sz="8")
    hint2 = doc.add_paragraph()
    run = hint2.add_run("Дата · М.П.")
    set_run(run, size=9, color=MUTED)


def build(name: str, doc_id: str) -> Document:
    doc = Document()
    section = doc.sections[0]
    section.page_width = Cm(21.0)
    section.page_height = Cm(29.7)
    section.left_margin = Cm(1.8)
    section.right_margin = Cm(1.8)
    section.top_margin = Cm(1.2)
    section.bottom_margin = Cm(1.6)

    header = section.header
    header.is_linked_to_previous = False
    table = header.add_table(rows=1, cols=3, width=Cm(17.4)
    )
    table.autofit = False
    row = table.rows[0]
    row.cells[0].width = Cm(1.6)
    row.cells[1].width = Cm(10.4)
    row.cells[2].width = Cm(5.4)

    p = row.cells[0].paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run()
    run.add_picture(str(LOGO), width=Cm(1.35))

    p = row.cells[1].paragraphs[0]
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run("AutoZap")
    set_run(run, size=18, bold=True, color=BLUE)
    p2 = row.cells[1].add_paragraph()
    p2.paragraph_format.space_before = Pt(0)
    p2.paragraph_format.space_after = Pt(0)
    run = p2.add_run("Площадка автозапчастей и сеть СТО")
    set_run(run, size=9, color=MUTED)

    p = row.cells[2].paragraphs[0]
    p.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    p.paragraph_format.space_after = Pt(0)
    run = p.add_run("+7 (927) 877-77-95")
    set_run(run, size=12, bold=True, color=BLUE)

    line = header.add_paragraph()
    add_bottom_border(line, color="0A78F0", sz="18")
    line.paragraph_format.space_before = Pt(2)
    line.paragraph_format.space_after = Pt(0)

    footer = section.footer
    footer.is_linked_to_previous = False
    fp = footer.paragraphs[0]
    fp.paragraph_format.space_before = Pt(4)
    run = fp.add_run("AutoZap · коммерческое предложение · конфиденциально")
    set_run(run, size=8, color=MUTED)
    tab = fp.add_run("\t+7 (927) 877-77-95")
    set_run(tab, size=8, color=MUTED)
    tabs = OxmlElement("w:tabs")
    tab_el = OxmlElement("w:tab")
    tab_el.set(qn("w:val"), "right")
    tab_el.set(qn("w:pos"), "9900")
    tabs.append(tab_el)
    fp._p.get_or_add_pPr().append(tabs)

    title = doc.add_paragraph()
    title.paragraph_format.space_before = Pt(8)
    title.paragraph_format.space_after = Pt(2)
    run = title.add_run("КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ")
    set_run(run, size=16, bold=True, color=BLUE)

    about = doc.add_paragraph()
    about.paragraph_format.space_after = Pt(4)
    run = about.add_run(f"о сотрудничестве между компаниями «AutoZap» и {name}")
    set_run(run, size=12)

    meta = doc.add_paragraph()
    meta.paragraph_format.space_after = Pt(10)
    run = meta.add_run(f"№ КП-2026/09-{doc_id}  ·  16 сентября 2026 г.")
    set_run(run, size=10, color=MUTED)

    body(
        doc,
        f"Компания AutoZap предлагает {name} сотрудничество в рамках развития продаж, "
        "продвижения бренда и расширения взаимодействия с представителями малого бизнеса.",
    )

    heading(doc, "Со стороны компании AutoZap предлагаем")
    offer(
        doc,
        1,
        "Регистрация на площадке AutoZap.",
        f"Регистрация {name} на нашей площадке во всех регионах, в которых представлена компания.",
    )
    offer(
        doc,
        2,
        "Бесплатное размещение ассортимента.",
        f"Возможность бесплатно разместить на нашей площадке полный ассортимент продукции {name} "
        "для дальнейшего продвижения и привлечения потенциальных клиентов.",
    )
    offer(
        doc,
        3,
        "Выделенный менеджер по продвижению.",
        f"Со стороны компании AutoZap будет выделен отдельный менеджер, который будет заниматься "
        f"продвижением {name} на нашей площадке, сопровождать взаимодействие и помогать в развитии продаж.",
    )
    offer(
        doc,
        4,
        "Продвижение в течение 3–5 месяцев.",
        f"В течение первых 3–5 месяцев менеджер будет активно заниматься продвижением {name} "
        "на площадке AutoZap, а также привлекать к сотрудничеству небольшие магазины и представителей малого бизнеса.",
    )
    body(
        doc,
        f"Основная задача — создать эффективное взаимодействие между крупным поставщиком и небольшими "
        f"торговыми организациями, что позволит расширить представленность продукции {name} и обеспечить "
        "дополнительные каналы продаж.",
    )
    offer(
        doc,
        5,
        "Региональное развитие.",
        f"Регистрация и продвижение {name} будут осуществляться в каждом регионе, где представлена компания, "
        "с целью формирования единой сети взаимодействия с локальными магазинами и партнёрами.",
    )
    offer(
        doc,
        6,
        "Сотрудничество с СТО AutoZap.",
        "Компания AutoZap также готова предоставить собственные станции технического обслуживания, "
        f"работающие под брендом AutoZap, в качестве дополнительного канала реализации и поставки запчастей {name}.",
    )

    heading(doc, "Мобильное приложение AutoZap")
    body(
        doc,
        "Для удобства клиентов и партнёров приложение AutoZap доступно на основных мобильных платформах:",
        justify=False,
    )
    for label, url in APPS:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.left_indent = Cm(0.5)
        run = p.add_run(f"{label}: {url}")
        set_run(run, size=11, color=BLUE)

    heading(doc, "Цель сотрудничества")
    table = doc.add_table(rows=1, cols=1)
    cell = table.cell(0, 0)
    shade(cell, "F3F7FC")
    set_cell_border(
        cell,
        top={"val": "nil"},
        bottom={"val": "nil"},
        right={"val": "nil"},
        left={"val": "single", "sz": "18", "color": "0A78F0"},
    )
    p = cell.paragraphs[0]
    p.paragraph_format.space_before = Pt(6)
    p.paragraph_format.space_after = Pt(6)
    run = p.add_run(
        f"Создание устойчивой модели взаимодействия между {name}, компанией AutoZap, малым бизнесом "
        "и сетью СТО, направленной на расширение рынка сбыта, увеличение представленности продукции "
        "и развитие долгосрочного партнёрства."
    )
    set_run(run, size=11)

    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(10)
    run = p.add_run("Контактный телефон AutoZap: ")
    set_run(run, size=11)
    run = p.add_run("+7 (927) 877-77-95")
    set_run(run, size=11, bold=True)

    signs = doc.add_table(rows=1, cols=2)
    signs.autofit = True
    left, right = signs.rows[0].cells
    for cell, label in ((left, "AutoZap"), (right, name)):
        cell.paragraphs[0].clear()
        run = cell.paragraphs[0].add_run(label)
        set_run(run, size=11, bold=True)
        p = cell.add_paragraph()
        add_bottom_border(p, color="8B97A6", sz="8")
        p.paragraph_format.space_before = Pt(16)
        hint = cell.add_paragraph()
        run = hint.add_run("Должность, подпись, расшифровка")
        set_run(run, size=9, color=MUTED)
        p = cell.add_paragraph()
        add_bottom_border(p, color="8B97A6", sz="8")
        hint = cell.add_paragraph()
        run = hint.add_run("Дата · М.П.")
        set_run(run, size=9, color=MUTED)

    return doc


def main() -> None:
    OUT_DIR.mkdir(exist_ok=True)
    for num, name, doc_id, slug in PARTNERS:
        path = OUT_DIR / f"{num}-KP-AutoZap-{slug}.docx"
        build(name, doc_id).save(path)
        print("wrote", path.name)


if __name__ == "__main__":
    main()
