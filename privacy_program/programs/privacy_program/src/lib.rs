use anchor_lang::prelude::*;

declare_id!("GHTszogQs3yHDPU4L5wQDRgcnddQh2nkizuuXAoFTpqG");

#[program]
pub mod privacy_program {
    use super::*;

    pub fn initialize_user(ctx: Context<InitializeUser>) -> Result<()> {
        let user_progress = &mut ctx.accounts.user_progress;
        user_progress.user = ctx.accounts.user.key();
        user_progress.completed_lessons = Vec::new();
        user_progress.points = 0;
        user_progress.allocated_balance = 0;
        user_progress.bump = ctx.bumps.user_progress;
        
        msg!("User progress initialized for: {:?}", user_progress.user);
        Ok(())
    }

    pub fn complete_lesson(ctx: Context<CompleteLesson>, lesson_id: String, points: u32, reward_amount: u64) -> Result<()> {
        let user_progress = &mut ctx.accounts.user_progress;
        
        // Check if already completed to avoid duplicate points/rewards
        if !user_progress.completed_lessons.contains(&lesson_id) {
            user_progress.completed_lessons.push(lesson_id.clone());
            user_progress.points += points;
            user_progress.allocated_balance += reward_amount;
            msg!("Lesson completed: {}! Points: {}, Reward Allocated: {}", lesson_id, points, reward_amount);
        } else {
            msg!("Lesson {} already completed.", lesson_id);
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeUser<'info> {
    #[account(
        init,
        payer = user,
        space = 8 + 32 + 4 + (128 * 10) + 4 + 8 + 1, // disc + pubkey + vec prefix + 10 ids (larger IDs) + points + balance + bump
        seeds = [b"user-progress", user.key().as_ref()],
        bump
    )]
    pub user_progress: Account<'info, UserProgress>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CompleteLesson<'info> {
    #[account(
        mut,
        seeds = [b"user-progress", user.key().as_ref()],
        bump = user_progress.bump
    )]
    pub user_progress: Account<'info, UserProgress>,
    pub user: Signer<'info>,
}

#[account]
pub struct UserProgress {
    pub user: Pubkey,
    pub completed_lessons: Vec<String>,
    pub points: u32,
    pub allocated_balance: u64,
    pub bump: u8,
}
