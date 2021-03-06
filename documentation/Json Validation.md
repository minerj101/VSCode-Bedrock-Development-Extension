# Json Validation

Json validation is applied to a specific filename or when it is placed in the appropriate folder. If \* is present in the json file pattern, then it
means that any amount of random character can be placed there. Version specific json validation is automatically applied. All elements should have
received a description and title. If none are present. Then that version hasn't been supported yet. You can request one as an issue. If a json
validation is missing, then also post an issue. And one will be made in the future unless a good reason why not has been given.

- [Json Validation](#json-validation)
  - [General](#general)
  - [World](#world)
  - [Resource packs](#resource-packs)
  - [Behaviour packs](#behaviour-packs)
  - [Skinpacks](#skinpacks)

## General

| Component      | Json file pattern   |
| -------------- | ------------------- |
| Manifest       | manifest.json       |
| Languages      | languages.json      |
| Language_names | language_names.json |

---

## World

| Component            | Json file pattern         |
| -------------------- | ------------------------- |
| World_behavior_packs | world_behavior_packs.json |
| World_resource_packs | world_resource_packs.json |

---

## Resource packs

For best results, name your folder with the letters RP/rp in them.

| Component             | Json file pattern                                                                                                                                                                                                                                                              |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Animation controllers | Can be one of the following:<br/> - `resource_packs/*/animation_controllers/*.json`<br/>- `*resource*pack*/animation_controllers.json`<br/>- `*Resource*pack*/animation_controllers.json`<br/>- `*RP*/animation_controllers/*.json`<br/> - `*rp*/animation_controllers/*.json` |
| Animations            | Can be one of the following:<br/> - `resource_packs/*/animations/*.json`<br/>- `*resource*pack*/animations.json`<br/>- `*Resource*pack*/animations.json`<br/>- `*RP*/animations/*.json`<br/> - `*rp*/animations/*.json`                                                        |
| Attachables           | attachables/\*.json                                                                                                                                                                                                                                                            |
| Biomes client         | biomes_client.json                                                                                                                                                                                                                                                             |
| Blocks                | blocks.json                                                                                                                                                                                                                                                                    |
| Entity                | entity/\*entity.json                                                                                                                                                                                                                                                           |
| Entity models         | Can be one of the following:<br/> - `*.geo.json`<br/> - `*.geometry.json`                                                                                                                                                                                                      |
| Flipbook textures     | flipbook_textures.json                                                                                                                                                                                                                                                         |
| Item texture          | item_texture.json                                                                                                                                                                                                                                                              |
| Materials             | \*.material                                                                                                                                                                                                                                                                    |
| Music definitions     | music_definitions.json                                                                                                                                                                                                                                                         |
| Particles             | Can be one of the following:<br/> - `particles/*.json`<br/> - `.particle.json`                                                                                                                                                                                                 |
| Render controllers    | render_controllers/\*.json                                                                                                                                                                                                                                                     |
| Sound definitions     | sound_definitions.json                                                                                                                                                                                                                                                         |
| Sounds                | sounds.json                                                                                                                                                                                                                                                                    |
| Terrain texture       | terrain_texture.json                                                                                                                                                                                                                                                           |
| Terrain list          | texture_list.json                                                                                                                                                                                                                                                              |

---

## Behaviour packs

For best results, name your folder with the letters BP/bp in them.

| Component             | Json file pattern                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Animation controllers | Can be one of the following:<br/> - `behavior_packs/*/animation_controllers/*.json`<br/> - `*BP*/animation_controllers/*.json`<br/> - `*bp*/animation_controllers/*.json` |
| Animations            | Can be one of the following:<br/> - `behavior_packs/*/animations/*.json`<br/> - `*BP*/animations/*.json`<br/> - `*bp*/animations/*.json`                                  |
| Blocks                | Can be one of the following:<br/> - `behavior_packs/*/blocks/*.json`<br/> - `*BP*/blocks/*.json`<br/> - `*bp*/blocks/*.json`                                              |
| Entity behaviours     | Can be one of the following:<br/> - `behavior_packs/*/entities/*.json`<br/> - `*BP*/entities/*.json`<br/> - `*bp*/entities/*.json`                                        |
| Item behaviours       | Can be one of the following:<br/> - `behavior_packs/*/items/*.json`<br/> - `*BP*/items/*.json`<br/> - `*bp*/items/*.json`                                                 |
| Loot tables           | Can be one of the following:<br/> - `behavior_packs/*/loot_tables/*.json`<br/> - `*BP*/loot_tables/*.json`<br/> - `*bp*/loot_tables/*.json`<br/> - `*.loot.json`          |
| Recipes               | `recipes/*.json`                                                                                                                                                          |
| Spawn rules           | `spawn_rules/*.json`                                                                                                                                                      |
| Trading               | Can be one of the following:<br/> - `behavior_packs/*/trading/*.json`<br/> - `*BP*/trading/*.json`<br/> - `*bp*/trading/*.json`<br/> - `*.trade.json`                     |

---

## Skinpacks

| Component | Json file pattern        |
| --------- | ------------------------ |
| Skins     | `*/skin_pack/skins.json` |
