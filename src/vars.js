// 1 = 1 meter
const solarSystem = {
    au: 149600000, //km = 50 units
    secondsInDay: 86400,
    speed: 50000, //1, //1000000,
    scale: 0.00002, //0.0000001,
    distance: 1, // 1,
    planetScale: 10, //200,
    equalDistance: true, // false,
    equalDistanceNum: 50, // 20,
    sun: {
        id: 0,
        diamiter: 1400000, // km 1km = 1000m
        distance: 0, // AU
        period: 0, // 1 year = x days
        rotation: 609.12, // hours in a day
    },
    mercury: {
        id: 1,
        diamiter: 4879, // km 1km = 1000m
        distance: 0.387, // AU
        period: 88, // 1 year = x days
        rotation: 1407.6, // hours in a day
    },
    venus: {
        id: 2,
        diamiter: 12104, // km 1km = 1000m
        distance: 0.723, // AU
        period: 224.7, // 1 year = x days
        rotation: -5832.5, // hours in a day
    },
    earth: {
        id: 3,
        diamiter: 12756, // km 1km = 1000m
        distance: 1, // AU
        period: 365.2, // 1 year = x days
        rotation: 23.9, // hours in a day
        moon: {
            id: 0,
            diamiter: 3475, // km 1km = 1000m
            distance: 0.002567, // AU
            period: 27.3, // 1 year = x days
            rotation: 655.7, //(hours)
        },
    },
    mars: {
        id: 4,
        diamiter: 6792, // km 1km = 1000m
        distance: 1.524, // AU
        period: 687, // 1 year = x days
        rotation: 24.6, //(hours)
    },
    jupiter: {
        id: 5,
        diamiter: 142984, // km 1km = 1000m
        distance: 5.204, // AU
        period: 4331, // 1 year = x days
        rotation: 9.9, //(hours)
    },
    saturn: {
        id: 6,
        diamiter: 120536, // km 1km = 1000m
        distance: 9.582, // AU
        period: 10747, // 1 year = x days
        rotation: 10.7, //(hours)
    },
    uranus: {
        id: 7,
        diamiter: 51118, // km 1km = 1000m
        distance: 19.201, // AU
        period: 30589, // 1 year = x days
        rotation: -17.2, //(hours)
    },
    neptune: {
        id: 8,
        diamiter: 49528, // km 1km = 1000m
        distance: 30.047, // AU
        period: 59800, // 1 year = x days
        rotation: 16.1, //(hours)
    },
    pluto: {
        id: 9,
        diamiter: 2370, // km 1km = 1000m
        distance: 39.5, // AU
        period: 90560, // 1 year = x days
        rotation: -153.3, //(hours)
    }
}
