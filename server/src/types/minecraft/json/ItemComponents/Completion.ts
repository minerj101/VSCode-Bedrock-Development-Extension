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
import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { CanDestroyComponent, CanPlaceOnComponent, Example, KeepOnDeathComponent, LockInInventoryComponent, LockInSlotComponent } from "./Constants";

export function Completion(receiver: CompletionItem[]): void {
  receiver.push(
    {
      label: "Json Item Components Example",
      kind: CompletionItemKind.Snippet,
      insertText: Example,
      documentation: Example,
    },
    {
      label: "Can destroy component",
      kind: CompletionItemKind.Snippet,
      insertText: CanDestroyComponent,
      documentation: CanDestroyComponent,
    },
    {
      label: "Can place on component",
      kind: CompletionItemKind.Snippet,
      insertText: CanPlaceOnComponent,
      documentation: CanPlaceOnComponent,
    },
    {
      label: "Can destroy component",
      kind: CompletionItemKind.Snippet,
      insertText: CanDestroyComponent,
      documentation: CanDestroyComponent,
    },
    {
      label: "Lock in inventory component",
      kind: CompletionItemKind.Snippet,
      insertText: LockInInventoryComponent,
      documentation: LockInInventoryComponent,
    },
    {
      label: "Keep on death component",
      kind: CompletionItemKind.Snippet,
      insertText: KeepOnDeathComponent,
      documentation: KeepOnDeathComponent,
    },
    {
      label: "Lock in slot component",
      kind: CompletionItemKind.Snippet,
      insertText: LockInSlotComponent,
      documentation: LockInSlotComponent,
    }
  );
}
