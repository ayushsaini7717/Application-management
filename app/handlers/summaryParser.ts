type ParsedResumeResponse = {
    summary: string;
    matchPercentage: number;
  };
  
  export default function parseResumeResponse(text: string): ParsedResumeResponse {
    const lines = text.split('\n');
  
    const startIndex = lines.findIndex(line => line.trim() === 'Resume Summary:');
    if (startIndex === -1) throw new Error("No 'Resume Summary:' header found");
  
    const bulletPoints: string[] = [];
    for (let i = startIndex + 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line.startsWith('- ')) {
        bulletPoints.push(line.slice(2).trim());
      } else if (line.startsWith('Match Percentage:')) {
        break;
      }
    }
  
    const matchLine = lines.find(line => line.trim().startsWith('Match Percentage:'));
    if (!matchLine) throw new Error("No 'Match Percentage:' line found");
  
    const matchPercentage = parseInt(
      matchLine.split(':')[1].trim().replace('%', ''),
      10
    );
  
    return {
      summary: bulletPoints.join(' * '),
      matchPercentage
    };
  }