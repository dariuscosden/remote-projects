import calendar
import datetime

# gets current unix timestamp in UTC


def get_unix():

    return calendar.timegm(datetime.datetime.utcnow().timetuple())
