import { SystemState } from '@/store/system/types';
import { SECTION_TYPE, UciSystemSystem, UciSystemTimeserver } from '@/shared/lib/uci/system';

export function getSystemLoading(state: SystemState): boolean {
	return state.systemLoading
}

export function getSystemSection(state: SystemState): UciSystemSystem {
	return state.sections.find(s => s['.type'] === SECTION_TYPE.SYSTEM) || {}
}

export function getTimeserverSection(state: SystemState): UciSystemTimeserver {
	return state.sections.find(s => s['.type'] === SECTION_TYPE.TIMESERVER) || {}
}
