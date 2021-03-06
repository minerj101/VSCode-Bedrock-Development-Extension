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
import { Diagnostic } from "vscode-languageserver";
import { LocationWord } from "../../../code/words/include";
import { DiagnoseBlock } from "../../general/Block/Diagnose";
import { DiagnoseBoolean } from "../../general/Boolean/Diagnose";
import { DiagnoseEffect } from "../../general/Effect/Diagnose";
import { DiagnoseEntity } from "../../general/Entity/Diagnose";
import { DiagnoseFloat } from "../../general/Float/Diagnose";
import { DiagnoseInteger } from "../../general/Integer/Diagnose";
import { DiagnoseKeyword } from "../../general/Keyword/Diagnose";
import { DiagnoseTag } from "../../general/Tag/Diagnose";
import { ValidationData } from "../../../validation/include";
import { Selector } from "../../general/include";
import { MCCommandParameter, MCCommandParameterType } from "./include";
import { DiagnoseFunctionPath } from "../../general/Functions/include";
import { DiagnoseCommandParameter } from "../command/include";
import { DiagnoseCoordinate } from "../../general/Coordinate/include";
import { DiagnoseGamemode } from "../../general/Gamemode/include";
import { DiagnoseObjective } from "../../general/Objectives/include";
import { DiagnoseTickingarea } from "../../general/Tickingarea/include";
import { DiagnoseParticle } from "../../minecraft/resource/particle/include";
import { ProvideOperationDiagnose } from "../modes/operation/include";
import { CommandIntr } from "../interpertation/include";
import { DiagnoseItem } from "../../general/Item/include";
import { DiagnoseString } from "../../general/String/Diagnose";
import { DiagnoseSound } from "../../general/Sound/Diagnose";
import { DiagnoseMode } from "../modes/include";
import { SlotTypeModes } from "../../general/slot type/slot type";
import { DiagnoseSlotID } from "../../general/slot id/Diagnose";

/**Diagnoses the single parameter
 * @param pattern
 * @param data
 * @param validation
 * @param receiver
 */
export function DiagnoseParameter(
  pattern: MCCommandParameter,
  data: LocationWord,
  validation: ValidationData,
  receiver: Diagnostic[],
  Command: CommandIntr
): void {
  if (pattern === undefined || data === undefined) return;

  if (pattern.Options) {
    //If wildcard is allowed and the text is an wildcard, then skip diagnose
    if (pattern.Options.wildcard && pattern.Options.wildcard === true) {
      if (data.text === "*") return;
    }

    //If accepted values is filled in and the text is a match, then skip diagnose
    if (pattern.Options.acceptedValues) {
      if (pattern.Options.acceptedValues.includes(data.text)) {
        return;
      }
    }
  }

  switch (pattern.Type) {
    case MCCommandParameterType.block:
      return DiagnoseBlock(data, receiver);

    case MCCommandParameterType.boolean:
      return DiagnoseBoolean(data, receiver);

    case MCCommandParameterType.command:
      return DiagnoseCommandParameter(data, receiver);

    case MCCommandParameterType.coordinate:
      return DiagnoseCoordinate(data, receiver);

    case MCCommandParameterType.effect:
      return DiagnoseEffect(data, receiver);

    case MCCommandParameterType.entity:
      return DiagnoseEntity(data, receiver);

    case MCCommandParameterType.event:
      return; //TODO

    case MCCommandParameterType.float:
      return DiagnoseFloat(data, receiver);

    case MCCommandParameterType.function:
      return DiagnoseFunctionPath(data, receiver);

    case MCCommandParameterType.gamemode:
      return DiagnoseGamemode(data, receiver);

    case MCCommandParameterType.integer:
      return DiagnoseInteger(data, receiver);

    case MCCommandParameterType.item:
      return DiagnoseItem(data, receiver);

    case MCCommandParameterType.jsonItem:
    case MCCommandParameterType.jsonRawText:
      return;

    case MCCommandParameterType.keyword:
      return DiagnoseKeyword(pattern, data, receiver);

    case MCCommandParameterType.locateFeature:
      return;

    case MCCommandParameterType.objective:
      return DiagnoseObjective(data, validation, receiver);

    case MCCommandParameterType.operation:
      return ProvideOperationDiagnose(data, Command, receiver);

    case MCCommandParameterType.particle:
      return DiagnoseParticle(data, receiver);

    case MCCommandParameterType.replaceMode:
      return;

    case MCCommandParameterType.selector:
      return Selector.ProvideDiagnostics(pattern, data, receiver, validation);

    case MCCommandParameterType.slotID:
      return DiagnoseSlotID(data, Command, receiver);

    case MCCommandParameterType.slotType:
      return DiagnoseMode(data, SlotTypeModes, receiver);

    case MCCommandParameterType.sound:
      return DiagnoseSound(data, receiver);

    case MCCommandParameterType.string:
      return DiagnoseString(data, receiver);

    case MCCommandParameterType.tag:
      return DiagnoseTag(data, validation, receiver);

    case MCCommandParameterType.target:
      return;

    case MCCommandParameterType.tickingarea:
      return DiagnoseTickingarea(data, receiver);

    case MCCommandParameterType.unknown:
    case MCCommandParameterType.xp:
      return;
  }
}
