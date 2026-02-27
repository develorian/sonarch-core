import { defineComponent } from '/src/core/engine.js';
import '/src/ui/components/sonarch-navbar.js';

defineComponent('layout-base', () => {
    return {
        template: /*html*/`
            <div class="fx fx-col min-h-screen">
                <sonarch-navbar></sonarch-navbar>
                <div class="content-area p-md fx fx-col items-ctr" style="flex: 1; padding-bottom: 4rem;">
                    <slot></slot> 
                </div>
            </div>
        `
    };
});