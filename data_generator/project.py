class Project:
    def __init__(self, project_id, title, explanation, price, due_date, created, completion_date, contracted, paid, project_phase, owner_id):
        self.project_id = project_id
        self.title = title
        self.explanation = explanation
        self.price = price
        self.due_date = due_date
        self.created = created
        self.completion_date = completion_date
        self.contracted = contracted
        self.paid = paid
        self.project_phase = project_phase
        self.owner_id = owner_id

    def show_info(self):
        info = "{0}, {1}, {2}, {3}, {4}, {5}, {6}, {7}, {8}, {9}, {10}"
        info = info.format(self.project_id, self.title, self.explanation, self.price, self.due_date, self.created,
            self.completion_date, self.contracted, self.paid, self.project_phase, self.owner_id)

        print(info)
