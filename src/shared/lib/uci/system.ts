import { UciSection, UciSectionEnabled } from '@/shared/lib/uci/index';

export enum SECTION_TYPE {
	SYSTEM = 'system',
	TIMESERVER = 'timeserver'
}

export interface UciSystemSection extends UciSection {
	'.type'?: SECTION_TYPE;
}

export interface UciSystemSystem extends UciSystemSection {
	timezone?: string;
}

export interface UciSystemTimeserver extends UciSystemSection {
	enabled?: UciSectionEnabled;
	enable_server?: UciSectionEnabled;
	server?: string[];
}
