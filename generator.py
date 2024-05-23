# import json
# from datetime import datetime, timedelta

# def generer_json_annee(annee):
#     data = {"annee": annee, "semaines": []}

#     # Définir la date du 1er janvier de l'année spécifiée
#     start_date = datetime(annee, 1, 1)

#     # Générer les semaines pour toute l'année
#     for numero_semaine in range(1, 53):
#         start_week = start_date + timedelta(days=(numero_semaine - 1) * 7)
#         end_week = start_week + timedelta(days=6)

#         semaine = {
#             "numero": numero_semaine,
#             "periode": {
#                 "start": start_week.strftime("%Y-%m-%dT%H:%M:%S"),
#                 "end": end_week.strftime("%Y-%m-%dT%H:%M:%S")
#             }
#         }

#         data["semaines"].append(semaine)

#     return data

# def sauvegarder_json(data, nom_fichier):
#     with open(nom_fichier, 'w') as file:
#         json.dump(data, file, indent=2)

# # Utilisation du générateur
# annee_cible = 2024
# donnees_json = generer_json_annee(annee_cible)
# sauvegarder_json(donnees_json, f"semaines_{annee_cible}.json")


import json
from datetime import datetime, timedelta

def generate_weeks(start_year, end_year):
    weeks = []
    index = 0
    current_date = datetime(start_year, 1, 1)

    while current_date.year <= end_year:
        week = {
            "index": index,
            "annee": current_date.year,
            "numero": current_date.isocalendar()[1],
            "periode": {
                "start": current_date.strftime("%Y-%m-%dT%H:%M:%S"),
                "end": (current_date + timedelta(days=6, hours=23, minutes=59, seconds=59)).strftime("%Y-%m-%dT%H:%M:%S")
            }
        }
        weeks.append(week)
        current_date += timedelta(days=7)
        index += 1
    return weeks

start_year = 2024
end_year = 2050

generated_weeks = generate_weeks(start_year, end_year)

# Écriture des données dans un fichier JSON
output_file_path = "semaines_data.json"

with open(output_file_path, "w") as output_file:
    json.dump(generated_weeks, output_file, indent=2)

print(f"Les données ont été écrites dans le fichier : {output_file_path}")
