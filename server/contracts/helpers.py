# Contract helpers
#
#


# gets contract
def get_contract(c):

    # base
    json_c = c.serialize

    # company
    json_c['company'] = c.company.serialize

    # tags
    json_c['tags'] = [t.serialize for t in c.tags]

    return json_c
