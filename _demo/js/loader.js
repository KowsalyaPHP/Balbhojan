function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) { elmnt.innerHTML = this.responseText; }
          if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

function hideelements(frameName, isContactPage) {
  setTimeout(function () {
    //var iframe = document.getElementById('subframe');
    var iframe = document.getElementById(frameName);
    var innerDoc = (iframe.contentDocument)
      ? iframe.contentDocument
      : iframe.contentWindow.document;
      var ulObjh = innerDoc.getElementsByClassName("navbar");
      if (ulObjh) {
          Array.prototype.forEach.call(ulObjh, function (el) {
              el.style.display = 'none';
              console.log(el.tagName);
          });
      }

      var ulObjf = innerDoc.getElementsByClassName("footer");
      if (ulObjf) {
          Array.prototype.forEach.call(ulObjf, function (el) {
              el.style.display = 'none';
              console.log(el.tagName);
          });
      }

      if (isContactPage) {
          var ulObji = innerDoc.getElementsByClassName("col-md-4");
          if (ulObji) {
              Array.prototype.forEach.call(ulObji, function (el) {
                  el.style.display = 'none';
                  console.log(el.tagName);
              });
          }
          var ulObji = innerDoc.getElementsByClassName("legend1");
          if (ulObji) {
              if (ulObji && frameName == 'subframe') {
                  Array.prototype.forEach.call(ulObji, function (el) {
                      el.style.display = 'none';
                      console.log(el.tagName);
                  });
              }
          }
      }

    //Suppressing This Snippet as we are opening Donate in a popup
    var ulObji = innerDoc.getElementsByClassName("panel-body");
    if (!ulObji.length === 0) {
        var ulInnerObj = ulObji[0].getElementsByClassName("row");
        if (ulInnerObj) {
            var ulInnerObjL2 = ulInnerObj[0].getElementsByClassName("col-md-8");
            if (ulInnerObjL2) ulInnerObjL2[0].style.display = 'none';
            var ulInnerObjL2 = ulInnerObj[0].getElementsByClassName("col-md-4");
            if (ulInnerObjL2) ulInnerObjL2[0].style.display = 'none';
        }
    }

    var ulObji = innerDoc.getElementById("myCarousel");
    if (ulObji)
      ulObji.style.display = 'none';

    iframe.height = "";
    iframe.height = iframe.contentWindow.document.body.scrollHeight + "px";
    return;
  }, 1000)
}

/* When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar */
var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-100px";
  }
  prevScrollpos = currentScrollPos;
}