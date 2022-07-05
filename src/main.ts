import { App, ItemView, Plugin, PluginSettingTab } from 'obsidian';

// Remember to rename these classes and interfaces!

interface TemporarilySaveNoteRefsPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: TemporarilySaveNoteRefsPluginSettings = {
    mySetting: 'default'
}

const VIEWTYPE_REFS = "temporarily-save-note-references";

export default class TemporarilySaveNoteRefsPlugin extends Plugin {
    settings: TemporarilySaveNoteRefsPluginSettings;

    async onload() {
        await this.loadSettings();

        this.registerView(VIEWTYPE_REFS, (leaf) => {
            const view = new RefsView(leaf);
            return view;
        });


        this.addCommand({
            id: "show-pane",
            name: "Show pane",
            callback: () => {
                this.app.workspace.getRightLeaf(false).setViewState({
                    type: VIEWTYPE_REFS
                });
            },
        });

        // This adds a settings tab so the user can configure various aspects of the plugin
        this.addSettingTab(new TemporarilySaveNoteRefsPluginSettingTab(this.app, this));
    }

    onunload() {

    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }
}

class TemporarilySaveNoteRefsPluginSettingTab extends PluginSettingTab {
    plugin: TemporarilySaveNoteRefsPlugin;

    constructor(app: App, plugin: TemporarilySaveNoteRefsPlugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display(): void {
        const { containerEl } = this;

        containerEl.empty();
    }
}

class RefsView extends ItemView {

    navigation = false;

    getViewType(): string {
        return VIEWTYPE_REFS;
    }
    getDisplayText(): string {
        return "note refs";
    }
}
