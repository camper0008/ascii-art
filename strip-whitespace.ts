function shortestSpaceBeforeContent(lines: string[]): number {
    let shortest = lines
        .map((x) => x.length)
        .reduce((acc, cur) => Math.max(acc, cur));
    for (const line of lines) {
        if (line.trim() === "") {
            continue;
        }
        const length = line.length - line.trimStart().length;
        shortest = Math.min(shortest, length);
    }
    return shortest;
}

function stripWhitespace(input: string): string {
    const lines = input.split("\n");
    const padding = shortestSpaceBeforeContent(lines);
    return lines
        .map((x) => x.slice(padding).trimEnd())
        .join("\n");
}

for (const arg of Deno.args) {
    await Deno.writeTextFile(
        arg,
        stripWhitespace(await Deno.readTextFile(arg)),
    );
}
