# Project helpers
#
#


# gets project
def get_project(p):

    # base
    json_p = p.serialize

    # company
    json_p['company'] = p.company.serialize

    # tags
    json_p['tags'] = [t.serialize for t in p.tags]

    return json_p
