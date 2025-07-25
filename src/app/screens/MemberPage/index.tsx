import React from 'react';
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom';
import { VisitorOtherPage } from './VisitOtherPage';
import { VisitMyPage } from './VisitMyPage';
import '../../../css/my_page.css';

function useQuery() {
	const { search } = useLocation();
	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function MemberPage(props: any) {
	const query = useQuery();
	let member = useRouteMatch();
	const chosen_mb_id: string | null = query.get('mb_id') ?? null;
	const chosen_art_id: string | null = query.get('art_id') ?? null;

	return (
		<div className='restaurant_page'>
			<Switch>
				<Route path={`${member.path}/other`}>
					<VisitorOtherPage
						chosen_mb_id={chosen_mb_id}
						chosen_art_id={chosen_art_id}
					/>
				</Route>
				<Route path={`${member.path}`}>
					<VisitMyPage />
				</Route>
			</Switch>
		</div>
	);
}
