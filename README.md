# Frogtion


Frogtion is a library for creating animations based on web cursor event handling. It is built with VanillaJS. It can be used in the browser.

[![Twitter Follow](https://img.shields.io/twitter/follow/devfrxg.svg?style=social)](https://twitter.com/devfrxg) [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/home?status=AOS%20-%20Animate%20on%20Scroll%20library%0Ahttps%3A//github.com/devfrxg/aos)

## 🏠 Home Page

[https://ox18.github.io/Frogtion/](https://ox18.github.io/Frogtion/)

## 🔥 Preview
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/handler_preview.gif)

## ⚙ Installation

### Basic

Add script in `<head>`:

```html
  <script type="text/javascript" src="https://cdn.deno.land/frogtion/versions/beta/raw/frogtion.js"></script>
```

or

```html
  <script type="text/javascript" src="https://cdn.deno.land/frogtion/versions/beta/raw/frogtion.min.js"></script>
```

---

## 🤔 How to use it?

### 1. Initialize Frogtity

```js
const buttonFrogtity = Frogtity
                        .init()                              // Set
                        .setRows(3)                          // Set
                        .setColumns(20)                      // Set
                        .setTotalCount(54)                   // Set
                        .addElement('#button-change-mobile') // Select the element in HTML
                        .setWidthPerFrame(920 / 20)          // Set
                        .setHeightPerFrame(126 / 3);         // Set
```
