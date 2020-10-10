/*BSD 3-Clause License

Copyright (c) 2020, Blockception Ltd
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/
import { Range } from 'vscode-languageserver';
import { MinecraftData } from '../Minecraft Data';
import { Block, Entity, Sound } from '../types/include';
import { Item } from '../types/Item/Item';
import * as data from "./minecraft data.json";

export function AddMinecraftData() {
	let Data : MinecraftData = new MinecraftData();

	data.vanilla.blocks.forEach(block => Data.Blocks.push(AddBlock(block)));
	data.vanilla.entities.forEach(entity => Data.Entities.push(AddEntity(entity)));
	data.vanilla.items.forEach(item => Data.Items.push(AddItem(item)));
	data.vanilla.sounds.forEach(sound => Data.Sounds.push(AddSound(sound)));

	data.edu.blocks.forEach(block => Data.Blocks.push(AddEduBlock(block)));
	data.edu.entities.forEach(entity => Data.Entities.push(AddEduEntity(entity)));
	data.edu.items.forEach(item => Data.Items.push(AddEduItem(item)));
	data.edu.sounds.forEach(sound => Data.Sounds.push(AddEduSound(sound)));
}

function AddBlock(data :string) : Block {
	let B = new Block();
	B.Name = data;
	B.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	B.Documentation = {kind:'markdown', value:'minecraft vanilla block: ' + data};

	return B;
}

function AddEntity(data :string) : Entity {
	let B = new Entity();
	B.Identifier = data;
	B.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	B.Documentation = {kind:'markdown', value:'minecraft vanilla entity: ' + data};
	B.Events = [
		"minecraft:entity_spawned"
	]

	return B;
}

function AddItem(data :string) : Item {
	let B = new Item();
	B.Identifier = data;
	B.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	B.Documentation = {kind:'markdown', value:'minecraft vanilla entity: ' + data};
	B.Events = [];

	return B;
}

function AddSound(data :string) : Sound {
	let S = new Sound();
	S.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	S.Name = data;

	return S;
}

function AddEduBlock(data :string) : Block {
	let B = new Block();
	B.Name = data;
	B.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	B.Documentation = {kind:'markdown', value:'**[EDU]** minecraft eduaction block: ' + data};

	return B;
}

function AddEduEntity(data :string) : Entity {
	let B = new Entity();
	B.Identifier = data;
	B.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	B.Documentation = {kind:'markdown', value:'**[EDU]** minecraft eduaction entity: ' + data};
	B.Events = [
		"minecraft:entity_spawned"
	]

	return B;
}

function AddEduItem(data :string) : Item {
	let B = new Item();
	B.Identifier = data;
	B.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	B.Documentation = {kind:'markdown', value:'**[EDU]** minecraft education entity: ' + data};
	B.Events = [];

	return B;
}

function AddEduSound(data :string) : Sound {
	let S = new Sound();
	S.Location = {
		range:Range.create(0, 0, 0, 0),
		uri:'https://minecraft.gamepedia.com/Add-on'
	};
	S.Name = data;

	return S;
}

