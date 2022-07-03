import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface TemporarilySaveNoteRefsPluginSettings {
    mySetting: string;
}

const DEFAULT_SETTINGS: TemporarilySaveNoteRefsPluginSettings = {
    mySetting: 'default'
}

export default class TemporarilySaveNoteRefsPlugin extends Plugin {
    settings: TemporarilySaveNoteRefsPluginSettings;

    async onload() {
        await this.loadSettings();



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
