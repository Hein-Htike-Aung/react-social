export enum RelationshipStatus {
	'Single' = 'Single',
	'Relationship' = 'Relationship',
	'PreferNotToSay' = 'PreferNotToSay',
}

export interface User {
	_id: string;
    username: string;
	email: string;
	password: string;
	profilePicture: string;
	coverPicture: string;
	followers: string[];
	followings: string[];
	isAdmin: boolean;
	desc: string;
	city: string;
	from: string;
	relationship: RelationshipStatus;
}