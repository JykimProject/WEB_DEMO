export enum UciSectionEnabled {
	ENABLED = '1',
	DISABLED = '0'
}

export enum UciSectionDisabled {
	ENABLED = '0',
	DISABLED = '1'
}

export interface UciSection {
	".anonymous"?: boolean;
	".index"?: number;
	".name"?: string;
	".type"?: string;
}

export class UciSection implements UciSection {

}

type UciResponseObject = {[key: string]: UciSection}

export function normalizeUciResponse(obj: UciResponseObject): UciSection[] {
	return Object.entries(obj).map(([_, value]) => value);
}
