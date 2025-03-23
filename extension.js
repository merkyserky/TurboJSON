(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed');
    }

    class MontserratTextExtension {
        constructor() {
            this.textElements = [];
        }

        getInfo() {
            return {
                id: 'montserratText',
                name: 'Montserrat Text',
                blocks: [
                    {
                        opcode: 'drawText',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'draw text [TEXT] at x: [X] y: [Y] size: [SIZE]',
                        arguments: {
                            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello, World!' },
                            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 32 }
                        }
                    },
                    {
                        opcode: 'clearText',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear all text'
                    }
                ]
            };
        }

        drawText(args, util) {
            const { TEXT, X, Y, SIZE } = args;

            // Create a div element
            const textElement = document.createElement('div');
            textElement.innerText = TEXT;
            textElement.style.position = 'absolute';
            textElement.style.left = `${X}px`;
            textElement.style.top = `${Y}px`;
            textElement.style.fontFamily = 'Montserrat, sans-serif';
            textElement.style.fontSize = `${SIZE}px`;
            textElement.style.pointerEvents = 'none'; // Prevent interaction
            textElement.style.whiteSpace = 'nowrap'; // Prevent text wrapping

            // Append the element to the stage
            const stage = document.getElementById('stage');
            if (stage) {
                stage.appendChild(textElement);
                this.textElements.push(textElement);
            } else {
                console.error('Stage element not found');
            }
        }

        clearText() {
            // Remove all text elements from the stage
            this.textElements.forEach(element => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
            });
            this.textElements = [];
        }
    }

    Scratch.extensions.register(new MontserratTextExtension());
})(Scratch);
