function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

interact('#elem')
    .resizable({
        preserveAspectRatio: false,
        edges: { left: true, right: true, bottom: true, top: true }
    })
    .on('resizemove', function (event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    })
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,
        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) { }
    });

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

var quote = $("#edit-quote");
var quoteBlock = $("#elem");
var quoteContainer = $("#container");
var resultSizeFont = $("#result");

quote.on("change paste keyup", function (event) {
    quoteBlock.html(event.target.value);
});

$(document).on("click", ".color", function () {
    quoteBlock.css("color", $(this).css("background-color"));
});
$(document).on("click", ".bg-color", function () {
    quoteContainer.css("background-color", $(this).css("background-color"));
});

$(document).on("click", ".font", function () {
    quoteBlock.css("font-family", $(this).css("font-family"));
});

$(document).on("input change", "#size-font", function() {
    console.log($(this).val());
    resultSizeFont.text($(this).val());
    quoteBlock.css("font-size", $(this).val() + "px");
});


var node = document.getElementById('container');

$("#download").click(function (event) {
    event.preventDefault();
    quoteContainer.css("border-color", "transparent");
    domtoimage.toBlob(node)
        .then(function (blob) {
            window.saveAs(blob, 'my-quote.png');
            quoteContainer.css("border-color", "#34495e");
        })
        .catch(function (error) {
            console.error('oops, something went wrong!', error);
        });
});


