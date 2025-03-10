import { BuilderContent, fetchEntries } from "@builder.io/sdk-angular";
import { environment } from "~/environments/environment";

const cache: any = {}; // These are cached translations

export async function getTranslations(
  pageName: string,
  defaultValue: any
): Promise<any> {
  // Get from the content API
  const model = `translations-${pageName}`;

  if (cache[model]) {
    // If we have previously cached then just return the cached value
    return cache[model];
  }

  const contents = await fetchEntries({
    apiKey: environment.builderApiKey,
    model,
    limit: 100, // 100 items is the maximum. Try to limit the number to less than this to avoid repeated calls
   // options: { cachebust: true },
  });
  
  const result = await asTranslation(defaultValue, contents, model);
  // Each property in the defaultValue should match one in the content otherwise we need to add it
  // Data is returned as an object of properties
  console.log("getTranslations result", result);
}

async function asTranslation(
  defaultValue: any,
  content: BuilderContent[],
  model: string,
  locale?: string
): Promise<any> {
  const result: any = {};
  for (const item of content) {
    let value = item.data!["value"];
    if (value["@type"] === "@builder.io/core:LocalizedValue") {
      // If the value is localized use the right one
      value = value.Default;
    }

    const property = item.data!["name"];
    if (value) {
      result[property] = value;
    }
  }

  console.log("result", result);
  const hasMissingProperties = Object.getOwnPropertyNames(defaultValue).some(
    (p) => !result[p]
  );
  if (hasMissingProperties) {
    // Add missing properties to Builder
    for (const key of Object.getOwnPropertyNames(defaultValue)) {
      if (!result[key]) {
        // Need to create a key and value of result[key]
        console.warn(`Translation for ${key} not found. Need to create it`);
        await addTranslation(model, key, defaultValue[key]);
      }
    }
  }
  cache[model] = result;
  return result;
}


/**
 * Add the name and value to Builder
 * @param {any} model:string The model name (should match "translations-<pageName>")
 * @param {any} name:string The unique name (eg "phone_number_text")
 * @param {any} value:string The text value (eg "Phone Number")
 * @returns {any}
 */
async function addTranslation(
  model: string,
  name: string,
  value: string
): Promise<void> {
  const data = {
    name,
    value,
  };
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${environment.builderPrivateKey}`,
  };
  const res = await fetch(`https://builder.io/api/v1/write/${model}`, {
    method: "POST",
    body: JSON.stringify({ name, published: "published", data }),
    headers,
  });
  if (res.status !== 200) {
    console.error(`Failed to add ${name}`);
  }
}
