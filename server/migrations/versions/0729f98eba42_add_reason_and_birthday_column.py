"""add reason and birthday column

Revision ID: 0729f98eba42
Revises: 449e94ff0c03
Create Date: 2024-07-03 12:22:10.738813

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0729f98eba42'
down_revision = '449e94ff0c03'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.add_column(sa.Column('reason', sa.String(), nullable=False, server_default='default_reason'))

    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.add_column(sa.Column('birthday', sa.String(), nullable=False, server_default='1900-01-01'))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patients', schema=None) as batch_op:
        batch_op.drop_column('birthday')

    with op.batch_alter_table('appointments', schema=None) as batch_op:
        batch_op.drop_column('reason')

    # ### end Alembic commands ###
