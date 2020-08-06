let captionJson;
function makeElement(title, id, defaultText) {
	const valueRep = nodecg.Replicant(id);
	valueRep.value = defaultText;

	const div = createDiv();

	const name = createP(title);
	name.parent(div);

	const form = createP();
	form.parent(div);

	const input = createElement('textarea', defaultText);
	input.parent(form);

	const button = createButton('Show');
	button.parent(form);
	button.mousePressed(()=>{valueRep.value=input.value()});
}

function preload() {
	captionJson = loadJSON("../shared/caption.json");
}

function setup() {
	createCanvas(0, 0);

	captionJson.data.forEach( (elm) => {
		makeElement(elm.name, elm.id, elm.default);
	});
}