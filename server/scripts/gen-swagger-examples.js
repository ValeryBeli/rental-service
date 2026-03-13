import fs from "fs";
import YAML from "yaml";
import { faker } from "@faker-js/faker";


const SWAGGER_PATH = "docs/swagger.yaml";


function genLoginExample() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
  };
}



const raw = fs.readFileSync(SWAGGER_PATH, "utf-8");
const doc = YAML.parse(raw);


const loginContent = doc?.paths?.["/login"]?.post?.requestBody?.content?.["application/json"];
if (!loginContent) {
  console.error("Не найден /login POST requestBody content application/json — проверь swagger.yaml");
  process.exit(1);
}


loginContent.example = genLoginExample();

function genOfferExample() {
  return {
    title: faker.lorem.words(3),
    description: faker.lorem.paragraph(),
    publishDate: faker.date.recent().toISOString().slice(0, 10),
    city: faker.location.city(),
    isPremium: faker.datatype.boolean(),
    isFavorite: faker.datatype.boolean(),
    rating: Number(faker.number.float({ min: 1, max: 5, fractionDigits: 1 })),
    type: faker.helpers.arrayElement(["apartment", "house", "room", "hotel"]),
    rooms: faker.number.int({ min: 1, max: 5 }),
    guests: faker.number.int({ min: 1, max: 8 }),
    price: faker.number.int({ min: 50, max: 500 }),
    features: JSON.stringify(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'
]),
    commentsCount: faker.number.int({ min: 0, max: 50 }),
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
    userId: faker.number.int({ min: 1, max: 10 })
  };
}

const offerContent =
doc?.paths?.["/offer"]?.post?.requestBody?.content?.["multipart/form-data"];


if (offerContent) {
  // Swagger UI displays example values in different places depending on the UI.
  // Add the generated example both to the media type (`example`) and to the
  // schema (`schema.example`) so the UI can pick it up for multipart/form-data.
  const example = genOfferExample();
  // Use deep clones when assigning the same example to multiple places so the
  // YAML serializer does not emit anchors/aliases (some editors/linters flag
  // anchors). JSON clone is sufficient for our simple data.
  const clone1 = JSON.parse(JSON.stringify(example));
  const clone2 = JSON.parse(JSON.stringify(example));
  offerContent.example = clone1;
  if (offerContent.schema) {
    offerContent.schema.example = clone2;
  }

  // Remove any old `examples` object to avoid duplicate/conflicting examples.
  if (offerContent.examples) {
    delete offerContent.examples;
  }

  // Also add a media-type `examples` object with `value` — some Swagger UI versions
  // prefer `examples.<name>.value` for filling form inputs. Keep both to maximize
  // compatibility.
  offerContent.examples = {
    generated: {
      summary: "Сгенерированный пример (только текстовые поля)",
      value: JSON.parse(JSON.stringify(example)),
    },
  };
  
  // Also write examples per-property so Swagger UI form inputs are pre-filled.
  // For file/binary fields (format: binary) we skip setting property.example.
  try {
    const schema = offerContent.schema;
    if (schema && schema.properties && typeof example === 'object') {
      Object.entries(example).forEach(([key, val]) => {
        const prop = schema.properties[key];
        if (!prop) return;
        // Skip binary file inputs
        if (prop.format === 'binary') return;
        // Set example on the property so Swagger UI uses it as field value
        prop.example = val;
      });
    }
  } catch (err) {
    // noop - generator should not crash for unexpected schema shapes
  }
}





fs.writeFileSync(SWAGGER_PATH, YAML.stringify(doc), "utf-8");


console.log("Готово! Example для POST /login записан в", SWAGGER_PATH);
