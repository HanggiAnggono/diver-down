import {Brand, Model, TestDrive, TestDriveStatus, Unit} from '~/services';
import {faker} from '@faker-js/faker';

export const brandImages = [
  'https://www.freeiconspng.com/uploads/toyota-logo-png-2.png',
  'https://pngimg.com/d/jeep_PNG95.png',
  'https://w7.pngwing.com/pngs/710/441/png-transparent-honda-logo-car-honda-cr-v-honda-accord-honda-angle-text-logo-thumbnail.png',
  'https://icon2.cleanpng.com/20180727/rkk/0d43fa33ad8b1adead454ffc7dd57987.webp',
  'https://w7.pngwing.com/pngs/995/480/png-transparent-bmw-car-logo-bmw-logo-trademark-logo-car-thumbnail.png',
  'https://w7.pngwing.com/pngs/313/756/png-transparent-aston-martin-db9-car-aston-martin-lagonda-logo-diagonal-angle-text-transport.png',
];

export const carImages = [
  'https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png',
  'https://purepng.com/public/uploads/large/red-mazda-car-8hq.png',
  'https://pngimg.com/d/toyota_PNG1954.png',
  'https://www.pngarc.com/wp-content/uploads/2023/05/Car-Wash-With-Water-Blue-Color-Car-With-Water-PNG.png',
  'https://mitrabangunanstore.id/wp-content/uploads/2024/01/black-bmw-m3-coupe-car.png',
  'https://i0.wp.com/sreditingzone.com/wp-content/uploads/2018/05/car-png-10.png?resize=780%2C518&ssl=1',
  'https://img1.picmix.com/output/stamp/normal/4/9/0/9/2389094_e5f7d.png',
  'https://chevrolet.com.ph/wp-content/uploads/2024/04/What-Makes-a-Car-a-%E2%80%98Sports-Car.png',
  'https://jakarta.bentleymotors.com/picserver1/userdata/25/11599/3FAdVwEMPE/m_my25_gt_speed_front%20600x300.png',
  'https://static.vecteezy.com/system/resources/thumbnails/036/268/355/small_2x/ai-generated-car-blue-car-suv-car-sport-utility-vehicle-blue-suv-car-blue-sport-utility-vehicle-suv-car-transparent-background-png.png',
];

faker.seed(42);
export const brands: Array<Brand> = Array.from({length: 13}, (_, i) => {
  const name = faker.vehicle.manufacturer();
  return {
    id: (i + 1).toString(),
    name,
    description: faker.lorem.sentence(),
    imageUrl: faker.helpers.arrayElement(brandImages),
  };
});

export const models: Array<Model> = Array.from({length: 20}, (_, i) => ({
  id: (i + 1).toString(),
  name: faker.vehicle.model(),
  brandId: faker.helpers.arrayElement(brands).id,
  get brand() {
    return brands.find(b => b.id === this.brandId) as Brand;
  },
  description: faker.lorem.sentence(60),
  imageUrl: faker.helpers.arrayElement(carImages),
  specs: {
    engineType: faker.helpers.arrayElement([
      'Gasoline',
      'Diesel',
      'Electric',
      'Hybrid',
    ]),
    engineCapacity: faker.helpers.arrayElement([
      1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5,
    ]),
    transmissionType: faker.helpers.arrayElement([
      'Automatic',
      'Manual',
      'Semi-Automatic',
    ]),
    driveType: faker.helpers.arrayElement(['FWD', 'RWD', 'AWD']),
    fuelType: faker.vehicle.fuel(),
    seats: faker.helpers.arrayElement([4, 5, 6, 7, 8]),
    doors: faker.helpers.arrayElement([2, 4]),
    length: faker.helpers.rangeToNumber({min: 3000, max: 8000}),
    width: faker.helpers.rangeToNumber({min: 1500, max: 2500}),
    height: faker.helpers.rangeToNumber({min: 1500, max: 2500}),
    wheelbase: faker.helpers.rangeToNumber({min: 2500, max: 4500}),
    curbWeight: faker.helpers.rangeToNumber({min: 1500, max: 3500}),
    grossWeight: faker.helpers.rangeToNumber({min: 1500, max: 4500}),
    fuelCapacity: faker.helpers.rangeToNumber({min: 20, max: 100}),
    topSpeed: faker.helpers.rangeToNumber({min: 120, max: 300}),
    acceleration: faker.helpers.arrayElement([
      '0-60 mph in 3.2 seconds',
      '0-60 mph in 3.5 seconds',
      '0-60 mph in 3.8 seconds',
    ]),
    torque: faker.helpers.arrayElement([
      '140 Nm @ 4000 rpm',
      '150 Nm @ 4000 rpm',
      '160 Nm @ 4000 rpm',
    ]),
    horsepower: faker.helpers.arrayElement([
      '100 hp @ 6000 rpm',
      '120 hp @ 6000 rpm',
      '110 hp @ 6000 rpm',
    ]),
  },
}));

// units
export const units: Array<Unit> = Array.from({length: 23}, (_, i) => {
  const modelId = faker.helpers.arrayElement(models).id;

  return {
    id: (i + 1).toString(),
    unitNumber: faker.vehicle.vin(),
    modelId,
    get model() {
      return models.find(m => m.id === this.modelId) as Model;
    },
    color: faker.vehicle.color(),
    year: 2023,
    availability: true,
    imageUrl: faker.helpers.arrayElement(carImages),
    location:
      faker.location.streetAddress() +
      ', ' +
      faker.location.city() +
      ', ' +
      faker.location.country(),
  };
});

// 7 Test Drive Schedules
export const testDrives: Array<TestDrive> = Array.from(
  {length: 10},
  (_, i) => ({
    id: (i + 1).toString(),
    unitId: faker.helpers.arrayElement(units).id,
    userId: (i + 1).toString(),
    dateFrom: faker.date.future(),
    dateTo: faker.date.future(),
    status: faker.helpers.arrayElement([
      TestDriveStatus.PENDING,
      TestDriveStatus.CONFIRMED,
      TestDriveStatus.IN_PROGRESS,
      TestDriveStatus.COMPLETED,
      TestDriveStatus.CANCELLED,
      TestDriveStatus.NO_SHOW,
    ]),
    testDriveTypeId: (i + 1).toString(),
    locationId: (i + 1).toString(),
    notes: faker.lorem.sentence(),
    salesRepId: (i + 1).toString(),
  }),
);
