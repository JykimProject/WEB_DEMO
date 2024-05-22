import Vue from 'vue'
import { SystemState, UciSystemSection } from '@/store/system/types';

export function SYSTEM_SET_LOADING(state: SystemState, loading: boolean) {
	state.systemLoading
}

export function SET_SYSTEM_SECTIONS(state: SystemState, sections: UciSystemSection[]) {
	Vue.set(state, 'sections', [...sections])
}
