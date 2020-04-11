const api = "api";
const apiVersion = "v1";
const GamesApiUrl = `/${api}/${apiVersion}/games`;
import * as NodeEnums from '../../../app/common/enums';

const StatusTranslations = Object.keys(NodeEnums.Statuses).reduce((acc, key) => {
    acc[NodeEnums.Statuses[key]] = key;
    return acc;
}, {});

export default Object.freeze({
    ...NodeEnums,
    GamesApiUrl,
    StatusTranslations,
});
