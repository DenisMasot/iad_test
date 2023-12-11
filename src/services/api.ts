import ky from 'ky';

export const api = ky.create({
  prefixUrl: `${window.location.origin}/api`,
  retry: {
		limit: 10,
		methods: ['get'],
		statusCodes: [413],
		backoffLimit: 3000
	}
});
