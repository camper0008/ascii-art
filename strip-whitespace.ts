function shortestSpaceBeforeContent(lines: string[]): number {
    let shortest = lines
        .map((x) => x.length)
        .reduce((acc, cur) => Math.max(acc, cur));
    for (const line of lines) {
        if (line.trim() === "" || line.startsWith("@comment")) {
            continue;
        }
        const length = line.length - line.trimStart().length;
        shortest = Math.min(shortest, length);
    }
    return shortest;
}

function stripEmptyLines(input: string[]): string[] {
    const output = [...input];
    while (true) {
        const line = output.pop();
        if (line === undefined) {
            break;
        }
        if (line.trim() === "") {
            continue;
        }
        output.push(line);
        break;
    }
    output.reverse();
    while (true) {
        const line = output.pop();
        if (line === undefined) {
            break;
        }
        if (line.trim() === "") {
            continue;
        }
        output.push(line);
        break;
    }
    output.reverse();
    return output;
}

function trimLine(line: string, padding: number): string {
    if (line.startsWith("@comment")) {
        return line.trimEnd();
    }
    return line.slice(padding).trimEnd();
}

function stripWhitespace(input: string): string {
    const lines = input.split("\n");
    const padding = shortestSpaceBeforeContent(lines);
    return stripEmptyLines(lines.map((x) => trimLine(x, padding))).join("\n");
}

for (const arg of Deno.args) {
    await Deno.writeTextFile(
        arg,
        stripWhitespace(await Deno.readTextFile(arg)),
    );
}
