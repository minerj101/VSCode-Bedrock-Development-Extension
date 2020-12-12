/*BSD 3-Clause License

Copyright (c) 2020, blockception Ltd
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
import { MarkupKind } from "vscode-languageserver";
import { Manager } from "../../manager/Manager";
import { MCCommand } from "../../types/commands/Command/include";
import { ParameterOptions, MCCommandParameterType, MCCommandParameter } from "../../types/commands/Parameter/include";
import * as data from "./commands.json";

interface Command {
  parameters: {
    Text: string;
    Type: string;
    Required: boolean;
    Options?: ParameterOptions | undefined;
  }[];
  name: string;
  documentation: {
    value: string;
    kind?: string;
  };
}

export function AddCommands(): void {
  data.vanilla.forEach((com) => {
    let Command = Convert(com);
    Manager.Data.Commands.add(Command);
  });

  if (Manager.Settings.useEducationContent)
    data.edu.forEach((com) => {
      let Command = Convert(com);
      Command.documentation.value = "**[EDU]** " + Command.documentation.value;
      Manager.Data.Commands.add(Command);
    });
}

function Convert(com: Command): MCCommand {
  let Command = new MCCommand();
  let kind: MarkupKind = MarkupKind.Markdown;

  if (com.documentation.kind === MarkupKind.PlainText) kind = MarkupKind.PlainText;

  Command.documentation = { value: com.documentation.value, kind: kind };
  Command.name = com.name;

  com.parameters.forEach((par) => {
    let type = par.Type as keyof typeof MCCommandParameterType;
    let Par = new MCCommandParameter(par.Text, MCCommandParameterType[type], par.Required);
    Command.parameters.push(Par);

    if (par.Options) {
      Par.Options = par.Options;
    } else {
      Par.Options = undefined;
    }
  });

  return Command;
}