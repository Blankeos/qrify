const TITLE_TEMPLATE = "%s | Qrify";

export default function getTitle(title: string = "Home") {
  return TITLE_TEMPLATE.replace("%s", title);
}
