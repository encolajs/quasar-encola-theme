// Lucide iconSet for Quasar — replaces Material Icons for every icon
// Quasar renders internally (dropdowns, clearables, pagination, table
// sort arrows, ...). No icon font, no @quasar/extras: each entry is a
// QIcon raw-SVG string ("pathD@@style&&...|viewBox"), so only the icons
// below ship with the app.
//
// The path data is generated from @lucide/vue's icon nodes (v1.31,
// ISC license) with non-path primitives (circle/line/rect) converted
// to path arcs/segments. Page-level icons use @lucide/vue components
// directly; this set only covers Quasar's internal icon names.
import type { QuasarIconSet } from 'quasar'

const style =
  'fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round'

function icon(...paths: string[]): string {
  return paths.map((d) => `${d}@@${style}`).join('&&') + '|0 0 24 24'
}

const circleCheckBig = icon("M21.801 10A10 10 0 1 1 17 3.335", "m9 11 3 3L22 4")
const circleX = icon("M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0", "m15 9-6 6", "m9 9 6 6")
const info = icon("M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0", "M12 16v-4", "M12 8h.01")
const triangleAlert = icon("m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3", "M12 9v4", "M12 17h.01")
const circleAlert = icon("M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0", "M12 8L12 12", "M12 16L12.01 16")
const arrowUp = icon("m5 12 7-7 7 7", "M12 19V5")
const arrowRight = icon("M5 12h14", "m12 5 7 7-7 7")
const arrowDown = icon("M12 5v14", "m19 12-7 7-7-7")
const arrowLeft = icon("m12 19-7-7 7-7", "M19 12H5")
const chevronUp = icon("m18 15-6-6-6 6")
const chevronDown = icon("m6 9 6 6 6-6")
const chevronLeft = icon("m15 18-6-6 6-6")
const chevronRight = icon("m9 18 6-6-6-6")
const chevronsLeft = icon("m11 17-5-5 5-5", "m18 17-5-5 5-5")
const chevronsRight = icon("m6 17 5-5-5-5", "m13 17 5-5-5-5")
const pipette = icon("m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12", "m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z", "m2 22 .414-.414")
const slidersHorizontal = icon("M10 5H3", "M12 19H3", "M14 3v4", "M16 17v4", "M21 12h-9", "M21 19h-5", "M21 5h-7", "M8 10v4", "M8 12H3")
const palette = icon("M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z", "M13 6.5a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0", "M17 10.5a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0", "M6 12.5a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0", "M8 7.5a0.5 0.5 0 1 0 1 0a0.5 0.5 0 1 0 -1 0")
const refreshCw = icon("M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", "M21 3v5h-5", "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", "M8 16H3v5")
const circle = icon("M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0")
const check = icon("M20 6 9 17l-5-5")
const clock = icon("M2 12a10 10 0 1 0 20 0a10 10 0 1 0 -20 0", "M12 6v6l4 2")
const calendarDays = icon("M8 2v3", "M16 2v3", "M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2Z", "M3 9h18", "M8 13h.01", "M12 13h.01", "M16 13h.01", "M8 17h.01", "M12 17h.01", "M16 17h.01")
const bold = icon("M6 12h9a4 4 0 0 1 0 8H7a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h7a4 4 0 0 1 0 8")
const italic = icon("M19 4L10 4", "M14 20L5 20", "M15 4L9 20")
const strikethrough = icon("M16 4H9a3 3 0 0 0-2.83 4", "M14 12a4 4 0 0 1 0 8H6", "M4 12L20 12")
const underline = icon("M6 4v6a6 6 0 0 0 12 0V4", "M4 20L20 20")
const list = icon("M3 5h.01", "M3 12h.01", "M3 19h.01", "M8 5h13", "M8 12h13", "M8 19h13")
const listOrdered = icon("M11 5h10", "M11 12h10", "M11 19h10", "M4 4h1v5", "M4 9h2", "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02")
const subscript = icon("m4 5 8 8", "m12 5-8 8", "M20 19h-4c0-1.5.44-2 1.5-2.5S20 15.33 20 14c0-.47-.17-.93-.48-1.29a2.11 2.11 0 0 0-2.62-.44c-.42.24-.74.62-.9 1.07")
const superscript = icon("m4 19 8-8", "m12 19-8-8", "M20 12h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06")
const link = icon("M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71")
const maximize = icon("M8 3H5a2 2 0 0 0-2 2v3", "M21 8V5a2 2 0 0 0-2-2h-3", "M3 16v3a2 2 0 0 0 2 2h3", "M16 21h3a2 2 0 0 0 2-2v-3")
const textQuote = icon("M17 5H3", "M21 12H8", "M21 19H8", "M3 12v7")
const textAlignStart = icon("M21 5H3", "M15 12H3", "M17 19H3")
const textAlignCenter = icon("M21 5H3", "M17 12H7", "M19 19H5")
const textAlignEnd = icon("M21 5H3", "M21 12H9", "M21 19H7")
const textAlignJustify = icon("M3 5h18", "M3 12h18", "M3 19h18")
const printer = icon("M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2", "M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6", "M7 14h10a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-10a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1Z")
const listIndentDecrease = icon("M21 5H11", "M21 12H11", "M21 19H11", "m7 8-4 4 4 4")
const listIndentIncrease = icon("M21 5H11", "M21 12H11", "M21 19H11", "m3 8 4 4-4 4")
const removeFormatting = icon("M4 7V4h16v3", "M5 20h6", "M13 4 8 20", "m15 15 5 5", "m20 15-5 5")
const type = icon("M12 4v16", "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", "M9 20h6")
const aLargeSmall = icon("m15 16 2.536-7.328a1.02 1.02 1 0 1 1.928 0L22 16", "M15.697 14h5.606", "m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16", "M3.304 13h6.392")
const minus = icon("M5 12h14")
const undo2 = icon("M9 14 4 9l5-5", "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11")
const redo2 = icon("m15 14 5-5-5-5", "M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13")
const heading = icon("M6 12h12", "M6 20V4", "M18 20V4")
const code = icon("m16 18 6-6-6-6", "m8 6-6 6 6 6")
const codeXml = icon("m18 16 4-4-4-4", "m6 8-4 4 4 4", "m14.5 4-5 16")
const plus = icon("M5 12h14", "M12 5v14")
const x = icon("M18 6 6 18", "m6 6 12 12")
const star = icon("M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z")
const pencil = icon("M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z", "m15 5 4 4")
const play = icon("M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z")
const cloudUpload = icon("M12 13v8", "M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242", "m8 17 4-4 4 4")
const listX = icon("M16 5H3", "M11 12H3", "M16 19H3", "m15.5 9.5 5 5", "m20.5 9.5-5 5")
const checkCheck = icon("M18 6 7 17l-5-5", "m22 10-7.5 7.5L13 16")

export const lucideIconSet: QuasarIconSet = {
  name: 'lucide',
  type: {
    positive: circleCheckBig,
    negative: circleX,
    info,
    warning: triangleAlert,
  },
  arrow: {
    up: arrowUp,
    right: arrowRight,
    down: arrowDown,
    left: arrowLeft,
    dropdown: chevronDown,
  },
  chevron: {
    left: chevronLeft,
    right: chevronRight,
  },
  colorPicker: {
    spectrum: pipette,
    tune: slidersHorizontal,
    palette,
  },
  pullToRefresh: {
    icon: refreshCw,
  },
  carousel: {
    left: chevronLeft,
    right: chevronRight,
    up: chevronUp,
    down: chevronDown,
    navigationIcon: circle,
  },
  chip: {
    remove: circleX,
    selected: check,
  },
  datetime: {
    arrowLeft: chevronLeft,
    arrowRight: chevronRight,
    now: clock,
    today: calendarDays,
  },
  editor: {
    bold,
    italic,
    strikethrough,
    underline,
    unorderedList: list,
    orderedList: listOrdered,
    subscript,
    superscript,
    hyperlink: link,
    toggleFullscreen: maximize,
    quote: textQuote,
    left: textAlignStart,
    center: textAlignCenter,
    right: textAlignEnd,
    justify: textAlignJustify,
    print: printer,
    outdent: listIndentDecrease,
    indent: listIndentIncrease,
    removeFormat: removeFormatting,
    formatting: type,
    fontSize: aLargeSmall,
    align: textAlignStart,
    hr: minus,
    undo: undo2,
    redo: redo2,
    heading,
    code,
    size: aLargeSmall,
    font: type,
    viewSource: codeXml,
  },
  expansionItem: {
    icon: chevronDown,
    denseIcon: chevronDown,
  },
  fab: {
    icon: plus,
    activeIcon: x,
  },
  field: {
    clear: circleX,
    error: circleAlert,
  },
  pagination: {
    first: chevronsLeft,
    prev: chevronLeft,
    next: chevronRight,
    last: chevronsRight,
  },
  rating: {
    icon: star,
  },
  stepper: {
    done: check,
    active: pencil,
    error: triangleAlert,
  },
  tabs: {
    left: chevronLeft,
    right: chevronRight,
    up: chevronUp,
    down: chevronDown,
  },
  table: {
    arrowUp,
    warning: triangleAlert,
    firstPage: chevronsLeft,
    prevPage: chevronLeft,
    nextPage: chevronRight,
    lastPage: chevronsRight,
  },
  tree: {
    icon: play,
  },
  uploader: {
    done: check,
    clear: x,
    add: plus,
    upload: cloudUpload,
    removeQueue: listX,
    removeUploaded: checkCheck,
  },
}
