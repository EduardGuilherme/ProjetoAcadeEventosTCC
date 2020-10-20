<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {}
};
</script>

<style lang="scss">
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: "Roboto Slab";
  font-weight: 400;
}
input {
  outline: none !important;
}
/* HTML5 display-role reset for older browsers */
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

body {
  height: 100vh;
  margin: 0;
  padding: 0px;
  width: 100%;
}
#app {
  height: 100%;
}

.container {
  max-width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

.font-size {
  &.-size-20 {
    font-size: 20px;
  }
  &.-size-18 {
    font-size: 18px;
  }
  &.-size-16 {
    font-size: 16px;
  }
  &.-size-14 {
    font-size: 14px;
  }
  &.-size-12 {
    font-size: 12px;
  }
  &.-size-10 {
    font-size: 10px;
  }
  &.-size-8 {
    font-size: 8px;
  }
}
.font-weight {
  &.-bold {
    font-weight: 700;
  }
}
.d-flex {
  display: flex;
  &.-justify-center {
    justify-content: center;
  }
  &.-justify-space-between {
    justify-content: space-between;
  }
  &.-justify-start {
    justify-content: flex-start;
  }
  &.-justify-end {
    justify-content: flex-end;
  }
  &.-align-end {
    align-items: flex-end;
  }
  &.-align-center {
    align-items: center;
  }
  &.-f-direction-column {
    flex-direction: column;
  }
}
.btn {
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 0;
  width: 100%;
  border-radius: 25px;
  text-align: center;
  &.-green {
    background: #309541;
    color: #fff;
  }
  &.-black {
    background: #000;
    color: #fff;
  }
  &.-border-green {
    background: transparent;
    border: 1px solid #309541;
    color: #fff;
  }
}
.has-bottom-menu {
  padding-bottom: 70px;
}
.has-toolbar {
  padding-top: 30px;
}
.animation-transition {
  opacity: 0;
  animation: showup 0.1s ease-in-out forwards;
  @keyframes showup {
    100% {
      opacity: 1;
    }
  }
}
</style>