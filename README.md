# Frogtion


Frogtion is a library for creating animations based on web cursor event handling. It is built with VanillaJS. It can be used in the browser.

[![Twitter Follow](https://img.shields.io/twitter/follow/devfrxg.svg?style=social)](https://twitter.com/devfrxg) [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/home?status=AOS%20-%20Animate%20on%20Scroll%20library%0Ahttps%3A//github.com/devfrxg/aos)

## 🏠 Home Page

[https://ox18.github.io/Frogtion/](https://ox18.github.io/Frogtion/)

## 🔥 Preview
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_1.gif)

## ⚙ Installation

### Basic

Add script in `<head>`:

```html
  <script type="text/javascript" src="https://cdn.deno.land/frogtion/versions/1.0.3/raw/frogtion.js"></script>
```

or

```html
  <script type="text/javascript" src="https://cdn.deno.land/frogtion/versions/1.0.3/raw/frogtion.min.js"></script>
```

---

## 🤔 How to use it?

### 1. Initialize Frogtity

```js
const buttonFrogtity = Frogtity
    // Initializes the class
    .init()
    // Set the number of rows the image has
    .setRows(3) 
    // Set the number of columns the image ha
    .setColumns(20) 
    // Set the number of frames it contains
    .setTotalCount(54) 
    // Set the label of the element to be applied
    .addElement('#button-change-mobile') 
    // Set the width of each frame
    .setWidthPerFrame(920 / 20) 
    // Set the height for each frame
    .setHeightPerFrame(126 / 3); 
```

### 2. Initialize Frogtion

```js
const frogtion = Frogtion
    // Initializes the class
    .init()
    // Set the frogtity we created previously
    .setFrogtity(buttonFrogtity)
    // Set the NORMAL animation (When the cursor does not perform any event, 
    // this animation would be the default).
    .addFrameNormal({ startFrame: 0, endFrame: 0 })
    // Set the animation when hovering over the element
    .addFrameHover({ startFrame: 0, endFrame: 19 })
    // Set the animation when the element is clicked on
    .addFrameClicked({ startFrame: 20, endFrame: 52, loop: false, endLoopChangeTo: CONSTS.STATUS_FRAME.HOVER })
    // Set the animation when the element is deactivated
    .addFrameDisabled({ startFrame: 53, endFrame: 53 })
    // Run the animation
    .run();
```

### 3. Set the style and image to be used
```css
#button-change-mobile{
    background-image: url(https://github.com/Ox18/Frogtion/blob/master/images/ChangeMobile.png);
    width: 46px;
    height: 42px;
    background-position: -0px -0px;
}
```
### 4. Set the element HTML
```html
<div id="button-change-mobile"></div>
```

### 5. Plus
The image I used for the example, is this one
All frames have the same sizes
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/ChangeMobile.png)

---

## 🥳 Some examples

### 1. Basic example
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_1.gif)
<br>
[View demo](https://codesandbox.io/s/example-01-ip8p9?file=/index.html)

### 2. Disabled example
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_2.gif)
<br>
[View demo](https://codesandbox.io/s/aged-surf-lg3df?file=/index.html)

### 3. Title and Tooltip example
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_3.gif)
<br>
[View demo](https://codesandbox.io/s/example-03-zk2o0?file=/index.html)

### 4. Other examples with different images
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_other_server_status_1.gif)
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_other_server_status_2.gif)
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_other_server_status_3.gif)
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_other_server_status_4.gif)
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/example_other_server_status_5.gif)

## 🖌 How to customize styles?

### 1. Change the tooltip
![Preview](https://github.com/Ox18/Frogtion/blob/master/images/how_to_change_css.png)