"""add patients table

Revision ID: 511ce746118b
Revises: b55befeb9458
Create Date: 2024-06-28 14:03:42.192379

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '511ce746118b'
down_revision = 'b55befeb9458'
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('first_name', sa.String(), nullable=False),
    sa.Column('last_name', sa.String(), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('gender', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_patients'))
    )


def downgrade():
    op.drop_table('patients')
