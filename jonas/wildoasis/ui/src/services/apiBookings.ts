// import { getToday } from '../utils/helpers';

import { BOOKINGS_URI } from '../types/constants';
import type { BookingsResponse } from '../types/responses.type';

interface GetBookingsParams {
  filter: {
    field: string;
    value: 'checked-out' | 'checked-in' | 'unconfirmed';
  } | null;
  sortBy: { field: 'startDate' | 'totalPrice'; direction: 'desc' | 'asc' };
}

export async function getBookings({
  filter,
  sortBy,
}: GetBookingsParams): Promise<BookingsResponse> {
  try {
    console.log('filter', filter);
    console.log('sortBy', sortBy);
    /*
      filter {field: 'status', value: 'checked-out'}
      sortBy {field: 'totalPrice', direction: 'asc'}
      /api/bookings?filter={field: 'status', value: 'checked-out'}
    */
    const urlParams = new URLSearchParams({
      filter: JSON.stringify(filter).trim(),
      sortBy: JSON.stringify(sortBy).trim(),
    });
    const response = await fetch(`${BOOKINGS_URI}?${urlParams}`);

    if (!response.ok && response.status !== 404) {
      throw new Error('Booking could not be loaded');
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.log('error', error);
    if (error instanceof Error) {
      throw error;
    }
    // Handle non-Error objects
    throw new Error('An unknown error occurred');
  }
}

/* 
export async function getBooking(id) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, cabins(*), guests(*)')
    .eq('id', id)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking not found');
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    .select('created_at, totalPrice, extrasPrice')
    .gte('created_at', date)
    .lte('created_at', getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from('bookings')
    // .select('*')
    .select('*, guests(fullName)')
    .gte('startDate', date)
    .lte('startDate', getToday());

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from('bookings')
    .select('*, guests(fullName, nationality, countryFlag)')
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order('created_at');

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error('Bookings could not get loaded');
  }
  return data;
}

export async function updateBooking(id, obj) {
  const { data, error } = await supabase
    .from('bookings')
    .update(obj)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error('Booking could not be updated');
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from('bookings').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Booking could not be deleted');
  }
  return data;
}
 */
