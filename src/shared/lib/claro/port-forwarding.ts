import { UciFirewallRedirect } from '@/shared/lib/uci/firewall';
import { IpAddr } from '@/store/network/types';

export const defaultRulesNo = 10;

export class PortForwardingService {
	interfaceName: string;
	serviceName: string;
	serverIp: IpAddr;
	rules: UciFirewallRedirect[];

	constructor(interfaceName: string = 'wan', serviceName: string = '', serverIp: IpAddr = '192.168.0', rules: UciFirewallRedirect[] = []) {
		this.interfaceName = interfaceName;
		this.serviceName = serviceName;
		this.serverIp = serverIp;
		this.rules = rules.map(r => ({...r}))
	}

	static empty(numRules: number = 1): PortForwardingService {
		let service = new PortForwardingService();

		service.rules = Array.from({length: numRules}, (): UciFirewallRedirect => {
			return Object.create({
				proto: 'tcp'
			})
		});

		return service;
	}

	static fromUciRules(uciRules: UciFirewallRedirect[], serviceName: string): PortForwardingService {
		const rules: UciFirewallRedirect[] = uciRules.filter((rule) => {
			return rule.name == serviceName
		})

		if (rules.length == 0) {
			return new PortForwardingService()
		}

		let service =  new PortForwardingService(
			rules[0].src,
			rules[0].name,
			rules[0].dest_ip,
		);

		service.rules = rules.map(r => Object.assign({proto: 'tcp'}, r))

		return service;
	}

	padRules() {
		const diff = defaultRulesNo - this.rules.length
		const toAdd = Array.from({length: diff}, (): UciFirewallRedirect => {
			return Object.create({
				proto: 'tcp'
			})
		});
		this.rules = [...this.rules, ...toAdd]
	}
}
