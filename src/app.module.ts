import { Venue } from './venue/Schemas/venue.model';
import { VenuePhoto } from './venue_photo/Schemas/venue_photo.model';
import { VenueType } from './venue_type/Schemas/venue_type.model';
import { Region } from './region/Schemas/region.model';
import { District } from './district/Schemas/district.model';
import { EventType } from './event_type/Schemas/event_type.model';
import { HumanCategory } from './human_category/Schemas/human_category.model';
import { Event } from './event/Schemas/event.model';
import { Seat } from './seat/Schemas/seat.model';
import { SeatType } from './seat_type/Schemas/seat_type.model';
import { Ticket } from './ticket/Schemas/ticket.model';
import { Customer } from './customer/Schemas/customer.model';
import { Language } from './language/Schemas/language.model';
import { CustomerAddress } from './customer_address/Schemas/customer_address.model';
import { Cart } from './cart/Schemas/cart.model';
import { Status } from './status/Schemas/status.model';
import { Booking } from './booking/Schemas/booking.model';
import { PaymentMethod } from './payment_method/Schemas/payment_method.model';
import { DeliveryMethod } from './delivery_method/Schemas/delivery_method.model';
import { DiscountCoupon } from './discount_coupon/Schemas/discount_coupon.model';
import { Country } from './country/Schemas/country.model';
import { Admin } from './admin/Schemas/admin.model';
import { TicketTypeModule } from './ticket_type/ticket_type.module';
import { TicketType } from './ticket_type/Schemas/ticket_type.model';
import { CustomerCard } from './customer_card/Schemas/customer_card.model';
import { GenderModule } from './gender/gender.module';
import { Gender } from './gender/Schemas/gender.model';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { VenueTypeModule } from './venue_type/venue_type.module';
import { VenueModule } from './venue/venue.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { EventTypeModule } from './event_type/event_type.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { EventModule } from './event/event.module';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { SeatModule } from './seat/seat.module';
import { TicketModule } from './ticket/ticket.module';
import { CustomerModule } from './customer/customer.module';
import { LanguageModule } from './language/language.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { CartModule } from './cart/cart.module';
import { StatusModule } from './status/status.module';
import { BookingModule } from './booking/booking.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { DiscountCouponModule } from './discount_coupon/discount_coupon.module';
import { CountryModule } from './country/country.module';
import { AdminModule } from './admin/admin.module';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        VenuePhoto,
        VenueType,
        Venue,
        Region,
        District,
        EventType,
        HumanCategory,
        Event,
        Seat,
        SeatType,
        Ticket,
        Customer,
        Language,
        CustomerAddress,
        Cart,
        Status,
        Booking,
        PaymentMethod,
        DeliveryMethod,
        DiscountCoupon,
        Country,
        Admin,
        TicketType,
        CustomerCard,
        Gender,
      ],
      autoLoadModels: true,
      logging: false,
    }),
    VenuePhotoModule,
    VenuePhoto,
    VenueTypeModule,
    VenueModule,
    RegionModule,
    DistrictModule,
    EventTypeModule,
    HumanCategoryModule,
    EventModule,
    SeatTypeModule,
    SeatModule,
    TicketModule,
    CustomerModule,
    LanguageModule,
    CustomerAddressModule,
    CustomerCardModule,
    CartModule,
    StatusModule,
    BookingModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    DiscountCouponModule,
    CountryModule,
    AdminModule,
    TicketTypeModule,
    GenderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
