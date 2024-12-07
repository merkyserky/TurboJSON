(function (Scratch) {
    'use strict';

    // Utility function: safe JSON parse
    function safeParse(jsonString) {
        try {
            return JSON.parse(jsonString);
        } catch (e) {
            // If parsing fails, return null or some fallback value
            return null;
        }
    }

    class BetterJSONTools {
        getInfo() {
            return {
                // This file might not need getInfo if you're using the JSON extension format of TurboWarp
                // But if you do, you can replicate the JSON here. Otherwise, rely on extension.json.
            };
        }

        parseJSON({JSON_TEXT}) {
            const obj = safeParse(JSON_TEXT);
            // We'll store internally as a string again but it might be beneficial to return a handle reference
            // For simplicity: just return the parsed object as a string
            return JSON.stringify(obj);
        }

        getJSONProperty({KEY, JSON_OBJ}) {
            const obj = safeParse(JSON_OBJ);
            if (obj && typeof obj === 'object' && obj.hasOwnProperty(KEY)) {
                if (typeof obj[KEY] === 'object') {
                    // Return it as a string
                    return JSON.stringify(obj[KEY]);
                } else {
                    return String(obj[KEY]);
                }
            }
            return '';
        }

        listJSONKeys({JSON_OBJ}) {
            const obj = safeParse(JSON_OBJ);
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                // Join keys with commas
                return Object.keys(obj).join(",");
            }
            return '';
        }

        hasKey({JSON_OBJ, KEY}) {
            const obj = safeParse(JSON_OBJ);
            if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
                return obj.hasOwnProperty(KEY);
            }
            return false;
        }

        listToJSON({LIST}) {
            // LIST is provided as a 2D array from Scratch/TurboWarp representing a list of items.
            // We can map it to a flat array. Typically, TurboWarp gives a 2D array structure.
            const arr = LIST.map(itemRow => itemRow[0]); // each 'itemRow' is an array like ["item"]
            return JSON.stringify(arr);
        }

        jsonToList({JSON_ARR}) {
            const arr = safeParse(JSON_ARR);
            if (Array.isArray(arr)) {
                // Return a CSV or something that can be split in Scratch, or directly as a string
                // We can't directly return a Scratch list here. We can return a string that can be split by a block later.
                // Another approach: if you want to return a list block, currently not directly supported. 
                // As a workaround, just return comma-separated values:
                return arr.join(",");
            }
            return '';
        }
    }

    Scratch.extensions.register(new BetterJSONTools());
})(Scratch);
