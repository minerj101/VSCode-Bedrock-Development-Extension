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
import { Location } from "vscode-languageserver";
import { TextDocument } from "vscode-languageserver-textdocument";
import { JsonDocument } from "../../../../code/json/include";
import { Database } from "../../../../database/include";
import { DataReference } from "../../../../database/Types/include";
import { EmptyTypes } from "../../../general/Empty";
import { Entity } from "../../../general/Entity/Entity";
import { behavior } from "../../include";
import { type_family } from "./components/minecraft.type_family";
import { ComponentContainer } from "./include";

/**
 * Processes the text document as a behaviour entity definition file
 * @param doc The document to parse
 */
export function Process(doc: TextDocument): void {
  let JDoc = new JsonDocument(doc);
  let Format = JDoc.CastTo<behavior.entities.Entity>();

  let entity: Entity | undefined;

  if (behavior.entities.Entity.is(Format)) {
    let mce = Format["minecraft:entity"];
    entity = new Entity();

    const ID = mce.description.identifier;

    entity.Identifier = ID;
    entity.Location = Location.create(doc.uri, EmptyTypes.EmptyRange());
    entity.Documentation.value = "The custom entity definition of: " + ID;

    if (mce.events) {
      let EventsNames = Object.getOwnPropertyNames(mce.events);
      entity.Events = EventsNames;
    }

    if (mce.component_groups) {
      let Groups = Object.getOwnPropertyNames(mce.component_groups);
      entity.ComponentGroups = Groups;

      for (let index = 0; index < Groups.length; index++) {
        const element = mce.component_groups[Groups[index]];

        if (element) {
          RetrieveFamilies(element, entity);
        }
      }
    }

    RetrieveFamilies(mce.components, entity);

    Database.Data.Behaviourpack.Entities.Set(new DataReference(entity.Identifier, entity.Location));
    Database.Data.General.Entities.Set(entity);
  }
}

function RetrieveFamilies(componentContainer: ComponentContainer | undefined, receiver: Entity) {
  if (componentContainer == undefined) return;

  let family_comp = componentContainer["minecraft:type_family"];

  if (type_family.is(family_comp)) {
    family_comp.family.forEach((f) => {
      if (!receiver.Families.includes(f)) receiver.Families.push(f);
    });
  }
}
