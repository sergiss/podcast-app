export const formatDateToDMY = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export const formatDuration = (duration: string): string => {
    if (duration.includes(':')) return duration;

    const seconds = parseInt(duration || '0');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    const paddedHours = String(hours).padStart(2, '0');
    const paddedMinutes = String(minutes).padStart(2, '0');
    const paddedSeconds = String(remainingSeconds).padStart(2, '0');

    return hours > 0 ? `${paddedHours}:${paddedMinutes}:${paddedSeconds}` : `${paddedMinutes}:${paddedSeconds}`;
}

export const getTextContentByTagName = (element: Node, selector: string) => {
    return (element as Element).getElementsByTagName(selector)?.[0]?.textContent || '';
};

export const simulateSlowNetwork = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));